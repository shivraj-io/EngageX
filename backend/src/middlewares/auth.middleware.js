const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const { errorResponse } = require('../utils/apiResponse');
const { STATUS_CODES, MESSAGES } = require('../utils/constants');
const config = require('../config/env');
const Admin = require('../models/Admin.model');

/**
 * Middleware to verify JWT token and authenticate admin
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if token exists
  if (!token) {
    return errorResponse(
      res,
      MESSAGES.UNAUTHORIZED,
      STATUS_CODES.UNAUTHORIZED
    );
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.jwt.secret);

    // Get admin from database
    const admin = await Admin.findById(decoded.id).select('-password');

    if (!admin) {
      return errorResponse(
        res,
        'Admin not found',
        STATUS_CODES.UNAUTHORIZED
      );
    }

    if (!admin.isActive) {
      return errorResponse(
        res,
        'Admin account is deactivated',
        STATUS_CODES.FORBIDDEN
      );
    }

    // Attach admin to request object
    req.admin = admin;
    next();

  } catch (error) {
    return errorResponse(
      res,
      'Invalid or expired token',
      STATUS_CODES.UNAUTHORIZED
    );
  }
});

module.exports = { protect };
