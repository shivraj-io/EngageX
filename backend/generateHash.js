const bcrypt = require('bcryptjs');

const generateHash = async () => {
  const password = 'admin123';
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  
  console.log('\n=================================');
  console.log('Admin Password Hash Generator');
  console.log('=================================');
  console.log('Password:', password);
  console.log('Hash:', hash);
  console.log('\nCopy this hash to .env file:');
  console.log(`ADMIN_PASSWORD=${hash}`);
  console.log('=================================\n');
};

generateHash();
