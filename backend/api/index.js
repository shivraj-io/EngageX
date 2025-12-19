const app = require('../src/app');
const connectDB = require('../src/config/db');

// MongoDB connection state
let isConnected = false;

// Connect to MongoDB with caching for serverless
async function connectToDatabase() {
  if (isConnected) {
    return;
  }
  
  try {
    await connectDB();
    isConnected = true;
  } catch (error) {
    console.error('Database connection failed:', error);
    isConnected = false;
  }
}

// Serverless function handler
module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS,PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Connect to database
    await connectToDatabase();
    
    // Handle the request with Express app
    return app(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
