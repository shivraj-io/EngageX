const express = require('express');
const cors = require('cors');
const config = require('./config/env');
const { errorHandler, notFound } = require('./middlewares/error.middleware');

// Import routes
const authRoutes = require('./routes/auth.routes');
const projectRoutes = require('./routes/project.routes');
const clientRoutes = require('./routes/client.routes');
const contactRoutes = require('./routes/contact.routes');
const newsletterRoutes = require('./routes/newsletter.routes');

// Initialize express app
const app = express();

// CORS configuration
app.use(cors({
  origin: config.frontendUrl,
  credentials: true
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

module.exports = app;
