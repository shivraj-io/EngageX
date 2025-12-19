const { validationResult } = require('express-validator');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const { STATUS_CODES, MESSAGES } = require('../utils/constants');
const Client = require('../models/Client.model');
const imagekit = require('../config/imagekit');

/**
 * @desc    Get all clients
 * @route   GET /api/clients
 * @access  Public
 */
const getAllClients = asyncHandler(async (req, res) => {
  const { status, featured, page = 1, limit = 10 } = req.query;

  // Build filter
  const filter = {};
  if (status) filter.status = status;
  if (featured !== undefined) filter.featured = featured === 'true';

  // Pagination
  const skip = (page - 1) * limit;

  const clients = await Client.find(filter)
    .sort({ order: 1, createdAt: -1 })
    .limit(parseInt(limit))
    .skip(skip);

  const total = await Client.countDocuments(filter);

  successResponse(
    res,
    {
      clients,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    },
    'Clients retrieved successfully'
  );
});

/**
 * @desc    Get single client by ID
 * @route   GET /api/clients/:id
 * @access  Public
 */
const getClientById = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);

  if (!client) {
    return errorResponse(
      res,
      'Client not found',
      STATUS_CODES.NOT_FOUND
    );
  }

  successResponse(res, { client }, 'Client retrieved successfully');
});

/**
 * @desc    Create new client
 * @route   POST /api/clients
 * @access  Private
 */
const createClient = asyncHandler(async (req, res) => {
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

  // Check if image is uploaded
  if (!req.file) {
    return errorResponse(
      res,
      'Client image is required',
      STATUS_CODES.BAD_REQUEST
    );
  }

  // Upload image to ImageKit
  const uploadResponse = await imagekit.upload({
    file: req.file.buffer.toString('base64'),
    fileName: `client-${Date.now()}-${req.file.originalname}`,
    folder: '/engagex/clients'
  });

  // Create client
  const client = await Client.create({
    ...req.body,
    imageUrl: uploadResponse.url,
    imageId: uploadResponse.fileId
  });

  successResponse(
    res,
    { client },
    MESSAGES.CREATED,
    STATUS_CODES.CREATED
  );
});

/**
 * @desc    Update client
 * @route   PUT /api/clients/:id
 * @access  Private
 */
const updateClient = asyncHandler(async (req, res) => {
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

  let client = await Client.findById(req.params.id);

  if (!client) {
    return errorResponse(
      res,
      'Client not found',
      STATUS_CODES.NOT_FOUND
    );
  }

  const updateData = { ...req.body };

  // If new image is uploaded, delete old one and upload new
  if (req.file) {
    try {
      // Delete old image from ImageKit
      await imagekit.deleteFile(client.imageId);
    } catch (error) {
      console.error('Error deleting old image:', error);
    }

    // Upload new image
    const uploadResponse = await imagekit.upload({
      file: req.file.buffer.toString('base64'),
      fileName: `client-${Date.now()}-${req.file.originalname}`,
      folder: '/engagex/clients'
    });

    updateData.imageUrl = uploadResponse.url;
    updateData.imageId = uploadResponse.fileId;
  }

  client = await Client.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true, runValidators: true }
  );

  successResponse(res, { client }, MESSAGES.UPDATED);
});

/**
 * @desc    Delete client
 * @route   DELETE /api/clients/:id
 * @access  Private
 */
const deleteClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);

  if (!client) {
    return errorResponse(
      res,
      'Client not found',
      STATUS_CODES.NOT_FOUND
    );
  }

  // Delete image from ImageKit
  try {
    await imagekit.deleteFile(client.imageId);
  } catch (error) {
    console.error('Error deleting image:', error);
  }

  await client.deleteOne();

  successResponse(res, null, MESSAGES.DELETED);
});

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
};
