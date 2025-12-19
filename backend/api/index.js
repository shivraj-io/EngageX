const app = require('../src/app');
const connectDB = require('../src/config/db');

let cachedDb = null;

// Connect to MongoDB with caching for serverless
async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  
  cachedDb = await connectDB();
  return cachedDb;
}

// Serverless function handler
module.exports = async (req, res) => {
  try {
    // Connect to database
    await connectToDatabase();
    
    // Handle the request with Express app
    return app(req, res);
  } catch (error) {
    console.error('Serverless function error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
