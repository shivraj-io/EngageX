const express = require('express');
const router = express.Router();
const {
  getAllSubscribers,
  subscribe,
  unsubscribe,
  deleteSubscriber
} = require('../controllers/newsletter.controller');
const { protect } = require('../middlewares/auth.middleware');

// Public routes
router.post('/', subscribe);
router.delete('/:id', unsubscribe);

// Protected routes
router.get('/', protect, getAllSubscribers);
router.delete('/:id/permanent', protect, deleteSubscriber);

module.exports = router;
