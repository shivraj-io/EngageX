const asyncHandler = require('../utils/asyncHandler');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const { STATUS_CODES, MESSAGES } = require('../utils/constants');
const Newsletter = require('../models/Newsletter.model');
const { sendNewsletterWelcome } = require('../services/email.service');

/**
 * @desc    Get all newsletter subscribers
 * @route   GET /api/newsletter
 * @access  Private
 */
const getAllSubscribers = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 10 } = req.query;

  // Build filter
  const filter = {};
  if (status) filter.status = status;

  // Pagination
  const skip = (page - 1) * limit;

  const subscribers = await Newsletter.find(filter)
    .sort({ subscribedAt: -1 })
    .limit(parseInt(limit))
    .skip(skip);

  const total = await Newsletter.countDocuments(filter);

  successResponse(
    res,
    {
      subscribers,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    },
    'Subscribers retrieved successfully'
  );
});

/**
 * @desc    Subscribe to newsletter
 * @route   POST /api/newsletter
 * @access  Public
 */
const subscribe = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Validate email
  if (!email) {
    return errorResponse(
      res,
      'Email is required',
      STATUS_CODES.BAD_REQUEST
    );
  }

  // Check if email already exists
  const existingSubscriber = await Newsletter.findOne({ email });

  if (existingSubscriber) {
    if (existingSubscriber.status === 'active') {
      return errorResponse(
        res,
        'Email already subscribed',
        STATUS_CODES.CONFLICT
      );
    } else {
      // Reactivate subscription
      existingSubscriber.status = 'active';
      existingSubscriber.subscribedAt = Date.now();
      existingSubscriber.unsubscribedAt = null;
      await existingSubscriber.save();

      return successResponse(
        res,
        { subscriber: existingSubscriber },
        'Subscription reactivated successfully',
        STATUS_CODES.OK
      );
    }
  }

  // Create new subscriber
  const subscriber = await Newsletter.create({ email });

  // Send welcome email (optional)
  try {
    await sendNewsletterWelcome(email);
  } catch (error) {
    console.error('Failed to send welcome email:', error);
  }

  successResponse(
    res,
    { subscriber },
    'Subscribed successfully',
    STATUS_CODES.CREATED
  );
});

/**
 * @desc    Unsubscribe from newsletter
 * @route   DELETE /api/newsletter/:id
 * @access  Public/Private
 */
const unsubscribe = asyncHandler(async (req, res) => {
  const subscriber = await Newsletter.findById(req.params.id);

  if (!subscriber) {
    return errorResponse(
      res,
      'Subscriber not found',
      STATUS_CODES.NOT_FOUND
    );
  }

  subscriber.status = 'unsubscribed';
  subscriber.unsubscribedAt = Date.now();
  await subscriber.save();

  successResponse(
    res,
    { subscriber },
    'Unsubscribed successfully'
  );
});

/**
 * @desc    Delete subscriber permanently
 * @route   DELETE /api/newsletter/:id/permanent
 * @access  Private
 */
const deleteSubscriber = asyncHandler(async (req, res) => {
  const subscriber = await Newsletter.findById(req.params.id);

  if (!subscriber) {
    return errorResponse(
      res,
      'Subscriber not found',
      STATUS_CODES.NOT_FOUND
    );
  }

  await subscriber.deleteOne();

  successResponse(res, null, MESSAGES.DELETED);
});

module.exports = {
  getAllSubscribers,
  subscribe,
  unsubscribe,
  deleteSubscriber
};
