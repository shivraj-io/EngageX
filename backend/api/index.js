const app = require('../src/app');
const connectDB = require('../src/config/db');

// MongoDB connection state
let cachedConnection = null;

// Connect to MongoDB with caching for serverless
async function connectToDatabase() {
  if (cachedConnection) {
    console.log('=> Using cached database connection');
    return cachedConnection;
  }
  
  console.log('=> Connecting to database...');
  cachedConnection = await connectDB();
  return cachedConnection;
}

// Serverless function handler
module.exports = async (req, res) => {
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS,PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');

    // Handle preflight
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    // Connect to database
    await connectToDatabase();
    
    // Pass request to Express app
    app(req, res);
  } catch (error) {
    console.error('=> Serverless function error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};
