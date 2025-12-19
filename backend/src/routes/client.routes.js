const express = require('express');
const router = express.Router();
const {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
} = require('../controllers/client.controller');
const {
  createClientValidation,
  updateClientValidation
} = require('../validations/client.validation');
const { protect } = require('../middlewares/auth.middleware');
const { uploadSingle } = require('../middlewares/upload.middleware');

// Public routes
router.get('/', getAllClients);
router.get('/:id', getClientById);

// Protected routes
router.post(
  '/',
  protect,
  uploadSingle('image'),
  createClientValidation,
  createClient
);

router.put(
  '/:id',
  protect,
  uploadSingle('image'),
  updateClientValidation,
  updateClient
);

router.delete('/:id', protect, deleteClient);

module.exports = router;
