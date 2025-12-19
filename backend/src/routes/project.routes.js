const express = require('express');
const router = express.Router();
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/project.controller');
const {
  createProjectValidation,
  updateProjectValidation
} = require('../validations/project.validation');
const { protect } = require('../middlewares/auth.middleware');
const { uploadSingle } = require('../middlewares/upload.middleware');

// Public routes
router.get('/', getAllProjects);
router.get('/:id', getProjectById);

// Protected routes
router.post(
  '/',
  protect,
  uploadSingle('image'),
  createProjectValidation,
  createProject
);

router.put(
  '/:id',
  protect,
  uploadSingle('image'),
  updateProjectValidation,
  updateProject
);

router.delete('/:id', protect, deleteProject);

module.exports = router;
