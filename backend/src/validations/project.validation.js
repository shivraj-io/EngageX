const { body } = require('express-validator');

const createProjectValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Project title is required')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Project description is required'),
  
  body('category')
    .optional()
    .trim(),
  
  body('technologies')
    .optional()
    .isArray()
    .withMessage('Technologies must be an array'),
  
  body('liveUrl')
    .optional()
    .trim()
    .isURL()
    .withMessage('Invalid live URL'),
  
  body('githubUrl')
    .optional()
    .trim()
    .isURL()
    .withMessage('Invalid GitHub URL'),
  
  body('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean'),
  
  body('status')
    .optional()
    .isIn(['active', 'archived', 'draft'])
    .withMessage('Invalid status value')
];

const updateProjectValidation = [
  body('title')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  
  body('description')
    .optional()
    .trim(),
  
  body('category')
    .optional()
    .trim(),
  
  body('technologies')
    .optional()
    .isArray()
    .withMessage('Technologies must be an array'),
  
  body('liveUrl')
    .optional()
    .trim()
    .isURL()
    .withMessage('Invalid live URL'),
  
  body('githubUrl')
    .optional()
    .trim()
    .isURL()
    .withMessage('Invalid GitHub URL'),
  
  body('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean'),
  
  body('status')
    .optional()
    .isIn(['active', 'archived', 'draft'])
    .withMessage('Invalid status value')
];

module.exports = {
  createProjectValidation,
  updateProjectValidation
};
