const { validationResult } = require('express-validator');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const { STATUS_CODES, MESSAGES } = require('../utils/constants');
const Project = require('../models/Project.model');
const imagekit = require('../config/imagekit');

/**
 * @desc    Get all projects
 * @route   GET /api/projects
 * @access  Public
 */
const getAllProjects = asyncHandler(async (req, res) => {
  const { status, featured, category, page = 1, limit = 10 } = req.query;

  // Build filter
  const filter = {};
  if (status) filter.status = status;
  if (featured !== undefined) filter.featured = featured === 'true';
  if (category) filter.category = category;

  // Pagination
  const skip = (page - 1) * limit;

  const projects = await Project.find(filter)
    .sort({ order: 1, createdAt: -1 })
    .limit(parseInt(limit))
    .skip(skip);

  const total = await Project.countDocuments(filter);

  successResponse(
    res,
    {
      projects,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    },
    'Projects retrieved successfully'
  );
});

/**
 * @desc    Get single project by ID
 * @route   GET /api/projects/:id
 * @access  Public
 */
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return errorResponse(
      res,
      'Project not found',
      STATUS_CODES.NOT_FOUND
    );
  }

  successResponse(res, { project }, 'Project retrieved successfully');
});

/**
 * @desc    Create new project
 * @route   POST /api/projects
 * @access  Private
 */
const createProject = asyncHandler(async (req, res) => {
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
      'Project image is required',
      STATUS_CODES.BAD_REQUEST
    );
  }

  // Upload image to ImageKit
  const uploadResponse = await imagekit.upload({
    file: req.file.buffer.toString('base64'),
    fileName: `project-${Date.now()}-${req.file.originalname}`,
    folder: '/engagex/projects'
  });

  // Parse technologies if it's a string
  let technologies = req.body.technologies;
  if (typeof technologies === 'string') {
    technologies = JSON.parse(technologies);
  }

  // Create project
  const project = await Project.create({
    ...req.body,
    technologies,
    imageUrl: uploadResponse.url,
    imageId: uploadResponse.fileId
  });

  successResponse(
    res,
    { project },
    MESSAGES.CREATED,
    STATUS_CODES.CREATED
  );
});

/**
 * @desc    Update project
 * @route   PUT /api/projects/:id
 * @access  Private
 */
const updateProject = asyncHandler(async (req, res) => {
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

  let project = await Project.findById(req.params.id);

  if (!project) {
    return errorResponse(
      res,
      'Project not found',
      STATUS_CODES.NOT_FOUND
    );
  }

  const updateData = { ...req.body };

  // Parse technologies if it's a string
  if (updateData.technologies && typeof updateData.technologies === 'string') {
    updateData.technologies = JSON.parse(updateData.technologies);
  }

  // If new image is uploaded, delete old one and upload new
  if (req.file) {
    try {
      // Delete old image from ImageKit
      await imagekit.deleteFile(project.imageId);
    } catch (error) {
      console.error('Error deleting old image:', error);
    }

    // Upload new image
    const uploadResponse = await imagekit.upload({
      file: req.file.buffer.toString('base64'),
      fileName: `project-${Date.now()}-${req.file.originalname}`,
      folder: '/engagex/projects'
    });

    updateData.imageUrl = uploadResponse.url;
    updateData.imageId = uploadResponse.fileId;
  }

  project = await Project.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true, runValidators: true }
  );

  successResponse(res, { project }, MESSAGES.UPDATED);
});

/**
 * @desc    Delete project
 * @route   DELETE /api/projects/:id
 * @access  Private
 */
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return errorResponse(
      res,
      'Project not found',
      STATUS_CODES.NOT_FOUND
    );
  }

  // Delete image from ImageKit
  try {
    await imagekit.deleteFile(project.imageId);
  } catch (error) {
    console.error('Error deleting image:', error);
  }

  await project.deleteOne();

  successResponse(res, null, MESSAGES.DELETED);
});

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};
