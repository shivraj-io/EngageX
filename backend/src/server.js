const app = require('./app');
const connectDB = require('./config/db');
const config = require('./config/env');

// Connect to MongoDB
connectDB();

// Start server
const PORT = config.port;

const server = app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════╗
║                                           ║
║   🚀 EngageX Backend Server Running       ║
║                                           ║
║   📍 Port: ${PORT}                          ║
║   🌍 Environment: ${config.nodeEnv}          ║
║   📅 Started: ${new Date().toLocaleString()}     ║
║                                           ║
╚═══════════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ UNHANDLED REJECTION! Shutting down...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Handle SIGTERM
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});
