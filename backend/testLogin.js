require('dotenv').config();
const bcrypt = require('bcryptjs');

const testLogin = async () => {
  const testPassword = 'admin123';
  const envPassword = process.env.ADMIN_PASSWORD;
  const envEmail = process.env.ADMIN_EMAIL;

  console.log('\n========== DEBUG INFO ==========');
  console.log('ENV Email:', envEmail);
  console.log('ENV Password Hash:', envPassword);
  console.log('Test Password:', testPassword);
  
  // Generate fresh hash
  const freshHash = await bcrypt.hash(testPassword, 10);
  console.log('\nFresh Hash:', freshHash);
  
  // Test comparison
  const isValid = await bcrypt.compare(testPassword, envPassword);
  console.log('\nPassword Match:', isValid);
  
  if (!isValid) {
    console.log('\n⚠️  PASSWORD MISMATCH!');
    console.log('Copy this hash to .env ADMIN_PASSWORD:');
    console.log(freshHash);
  } else {
    console.log('\n✅ Password is correct!');
  }
  console.log('================================\n');
};

testLogin();
