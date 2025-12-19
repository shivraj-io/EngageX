// HTTP Status Codes
const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
};

// Response Messages
const MESSAGES = {
  SUCCESS: 'Operation successful',
  CREATED: 'Resource created successfully',
  UPDATED: 'Resource updated successfully',
  DELETED: 'Resource deleted successfully',
  NOT_FOUND: 'Resource not found',
  UNAUTHORIZED: 'Authentication required',
  FORBIDDEN: 'Access denied',
  INVALID_CREDENTIALS: 'Invalid credentials',
  SERVER_ERROR: 'Internal server error',
  VALIDATION_ERROR: 'Validation error'
};

// Allowed file types for upload
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

// Pagination defaults
const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100
};

module.exports = {
  STATUS_CODES,
  MESSAGES,
  ALLOWED_IMAGE_TYPES,
  PAGINATION
};
