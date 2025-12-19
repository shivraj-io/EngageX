const mongoose = require('mongoose');
const config = require('./env');

const connectDB = async () => {
  try {
    // Check if already connected (for serverless caching)
    if (mongoose.connection.readyState >= 1) {
      return mongoose.connection;
    }

    const conn = await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s
      socketTimeoutMS: 45000, // Close sockets after 45s
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error(`❌ MongoDB connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  MongoDB disconnected');
    });

    return conn;

  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    throw error; // Don't exit in serverless environment
  }
};

module.exports = connectDB;
