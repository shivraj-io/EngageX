const { validationResult } = require('express-validator');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const { STATUS_CODES, MESSAGES } = require('../utils/constants');
const Admin = require('../models/Admin.model');
const { generateToken } = require('../services/auth.service');

/**
 * @desc    Admin login
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = asyncHandler(async (req, res) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(
      res,
      MESSAGES.VALIDATION_ERROR,
      STATUS_CODES.BAD_REQUEST,
      errors.array()
    );
  }

  const { username, password } = req.body;

  // Find admin with password field
  const admin = await Admin.findOne({ username }).select('+password');

  if (!admin) {
    return errorResponse(
      res,
      MESSAGES.INVALID_CREDENTIALS,
      STATUS_CODES.UNAUTHORIZED
    );
  }

  // Check if admin is active
  if (!admin.isActive) {
    return errorResponse(
      res,
      'Account is deactivated',
      STATUS_CODES.FORBIDDEN
    );
  }

  // Verify password
  const isPasswordValid = await admin.comparePassword(password);

  if (!isPasswordValid) {
    return errorResponse(
      res,
      MESSAGES.INVALID_CREDENTIALS,
      STATUS_CODES.UNAUTHORIZED
    );
  }

  // Generate JWT token
  const token = generateToken(admin._id);

  // Send response
  successResponse(
    res,
    {
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email
      }
    },
    'Login successful',
    STATUS_CODES.OK
  );
});

/**
 * @desc    Get current admin profile
 * @route   GET /api/auth/me
 * @access  Private
 */
const getMe = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin.id);

  successResponse(
    res,
    {
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        isActive: admin.isActive
      }
    },
    'Profile retrieved successfully'
  );
});

module.exports = {
  login,
  getMe
};
