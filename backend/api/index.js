const app = require('../src/app');
const connectDB = require('../src/config/db');

// MongoDB connection caching
let isConnected = false;

// Connect to MongoDB with caching for serverless
async function connectToDatabase() {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }
  
  try {
    await connectDB();
    isConnected = true;
    console.log('New database connection established');
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
}

// Serverless function handler
module.exports = async (req, res) => {
  // Set CORS headers manually
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS,PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Connect to database
    await connectToDatabase();
    
    // Handle the request with Express app
    return app(req, res);
  } catch (error) {
    console.error('Serverless function error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
