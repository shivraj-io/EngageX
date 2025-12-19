const asyncHandler = require('../utils/asyncHandler');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const { STATUS_CODES, MESSAGES } = require('../utils/constants');
const Contact = require('../models/Contact.model');
const { sendContactNotification } = require('../services/email.service');

/**
 * @desc    Get all contact submissions
 * @route   GET /api/contact
 * @access  Private
 */
const getAllContacts = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 10 } = req.query;

  // Build filter
  const filter = {};
  if (status) filter.status = status;

  // Pagination
  const skip = (page - 1) * limit;

  const contacts = await Contact.find(filter)
    .sort({ createdAt: -1 })
    .limit(parseInt(limit))
    .skip(skip);

  const total = await Contact.countDocuments(filter);

  successResponse(
    res,
    {
      contacts,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    },
    'Contact submissions retrieved successfully'
  );
});

/**
 * @desc    Get single contact submission by ID
 * @route   GET /api/contact/:id
 * @access  Private
 */
const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return errorResponse(
      res,
      'Contact submission not found',
      STATUS_CODES.NOT_FOUND
    );
  }

  // Mark as read
  if (!contact.isRead) {
    contact.isRead = true;
    contact.status = 'read';
    await contact.save();
  }

  successResponse(res, { contact }, 'Contact submission retrieved successfully');
});

/**
 * @desc    Submit contact form
 * @route   POST /api/contact
 * @access  Public
 */
const submitContact = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return errorResponse(
      res,
      'Name, email, and message are required',
      STATUS_CODES.BAD_REQUEST
    );
  }

  // Create contact submission
  const contact = await Contact.create({
    name,
    email,
    phone,
    subject,
    message
  });

  // Send notification email (optional, won't fail if email is not configured)
  try {
    await sendContactNotification(contact);
  } catch (error) {
    console.error('Failed to send notification email:', error);
  }

  successResponse(
    res,
    { contact },
    'Contact form submitted successfully',
    STATUS_CODES.CREATED
  );
});

/**
 * @desc    Update contact status
 * @route   PATCH /api/contact/:id/status
 * @access  Private
 */
const updateContactStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!['new', 'read', 'replied', 'archived'].includes(status)) {
    return errorResponse(
      res,
      'Invalid status value',
      STATUS_CODES.BAD_REQUEST
    );
  }

  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { status, isRead: status !== 'new' },
    { new: true, runValidators: true }
  );

  if (!contact) {
    return errorResponse(
      res,
      'Contact submission not found',
      STATUS_CODES.NOT_FOUND
    );
  }

  successResponse(res, { contact }, 'Contact status updated successfully');
});

/**
 * @desc    Delete contact submission
 * @route   DELETE /api/contact/:id
 * @access  Private
 */
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return errorResponse(
      res,
      'Contact submission not found',
      STATUS_CODES.NOT_FOUND
    );
  }

  await contact.deleteOne();

  successResponse(res, null, MESSAGES.DELETED);
});

module.exports = {
  getAllContacts,
  getContactById,
  submitContact,
  updateContactStatus,
  deleteContact
};
