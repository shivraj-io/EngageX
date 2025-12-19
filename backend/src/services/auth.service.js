const jwt = require('jsonwebtoken');
const config = require('../config/env');

/**
 * Generate JWT token for admin
 */
const generateToken = (adminId) => {
  return jwt.sign(
    { id: adminId },
    config.jwt.secret,
    { expiresIn: config.jwt.expire }
  );
};

/**
 * Verify JWT token
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.jwt.secret);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

module.exports = {
  generateToken,
  verifyToken
};
