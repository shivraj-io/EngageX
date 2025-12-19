const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import Admin model
const Admin = require('./src/models/Admin.model');

// MongoDB connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/engagex';

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      console.log('Username:', existingAdmin.username);
      console.log('Email:', existingAdmin.email);
      
      // Ask if want to update password
      const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      readline.question('Do you want to reset the password? (yes/no): ', async (answer) => {
        if (answer.toLowerCase() === 'yes') {
          const salt = await bcrypt.genSalt(10);
          existingAdmin.password = await bcrypt.hash('admin123', salt);
          await existingAdmin.save();
          console.log('✅ Password reset successfully!');
          console.log('New Password: admin123');
        }
        readline.close();
        process.exit(0);
      });
      return;
    }

    // Create new admin
    const admin = await Admin.create({
      username: 'admin',
      email: 'admin@engagex.com',
      password: 'admin123', // This will be hashed automatically by the model
      isActive: true
    });

    console.log('\n✅ Admin user created successfully!\n');
    console.log('═══════════════════════════════════');
    console.log('Username: admin');
    console.log('Email: admin@engagex.com');
    console.log('Password: admin123');
    console.log('═══════════════════════════════════');
    console.log('\n⚠️  Please change the password after first login!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

// Run the function
createAdmin();
