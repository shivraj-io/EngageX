const express = require('express');
const router = express.Router();
const { login, getMe } = require('../controllers/auth.controller');
const { loginValidation } = require('../validations/auth.validation');
const { protect } = require('../middlewares/auth.middleware');

// Public routes
router.post('/login', loginValidation, login);

// Protected routes
router.get('/me', protect, getMe);

module.exports = router;
