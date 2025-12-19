const { STATUS_CODES } = require('./constants');

/**
 * Standard API response formatter
 */
class ApiResponse {
  constructor(statusCode, data, message = 'Success') {
    this.statusCode = statusCode;
    this.success = statusCode < 400;
    this.message = message;
    this.data = data;
  }
}

/**
 * Success response helper
 */
const successResponse = (res, data, message = 'Success', statusCode = STATUS_CODES.OK) => {
  return res.status(statusCode).json(new ApiResponse(statusCode, data, message));
};

/**
 * Error response helper
 */
const errorResponse = (res, message = 'Error', statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR, errors = null) => {
  return res.status(statusCode).json({
    statusCode,
    success: false,
    message,
    errors
  });
};

module.exports = {
  ApiResponse,
  successResponse,
  errorResponse
};
