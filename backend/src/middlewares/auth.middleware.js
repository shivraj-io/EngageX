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

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return errorResponse(
      res,
      MESSAGES.UNAUTHORIZED,
      STATUS_CODES.UNAUTHORIZED
    );
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret);

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
