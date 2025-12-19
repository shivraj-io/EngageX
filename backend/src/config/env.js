const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/engagex',
  
  jwt: {
    secret: process.env.JWT_SECRET || 'fallback_secret_key',
    expire: process.env.JWT_EXPIRE || '1d'
  },
  
  admin: {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD
  },
  
  imagekit: {
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
  },
  
  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT || 587,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    from: process.env.EMAIL_FROM || 'noreply@engagex.com'
  },
  
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  
  upload: {
    maxFileSize: process.env.MAX_FILE_SIZE || 5242880 // 5MB
  }
};

module.exports = config;
