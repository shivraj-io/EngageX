const express = require('express');
const router = express.Router();
const {
  getAllContacts,
  getContactById,
  submitContact,
  updateContactStatus,
  deleteContact
} = require('../controllers/contact.controller');
const { protect } = require('../middlewares/auth.middleware');

// Public routes
router.post('/', submitContact);

// Protected routes
router.get('/', protect, getAllContacts);
router.get('/:id', protect, getContactById);
router.patch('/:id/status', protect, updateContactStatus);
router.delete('/:id', protect, deleteContact);

module.exports = router;
