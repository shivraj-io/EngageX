const { validationResult } = require('express-validator');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const { STATUS_CODES, MESSAGES } = require('../utils/constants');
const Admin = require('../models/Admin.model');
const { generateToken } = require('../services/auth.service');

/**
 * @desc    Admin login
 * @route   POST /api/admin/login
 * @access  Public
 */
const login = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(
      res,
      MESSAGES.VALIDATION_ERROR,
      STATUS_CODES.BAD_REQUEST,
      errors.array()
    );
  }

  const { email, password } = req.body;

  const admin = await Admin.findOne({ email }).select('+password');

  if (!admin) {
    return errorResponse(
      res,
      MESSAGES.INVALID_CREDENTIALS,
      STATUS_CODES.UNAUTHORIZED
    );
  }

  if (!admin.isActive) {
    return errorResponse(
      res,
      'Account is deactivated',
      STATUS_CODES.FORBIDDEN
    );
  }

  const isPasswordValid = await admin.comparePassword(password);

  if (!isPasswordValid) {
    return errorResponse(
      res,
      MESSAGES.INVALID_CREDENTIALS,
      STATUS_CODES.UNAUTHORIZED
    );
  }

  const token = generateToken(admin._id);

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
