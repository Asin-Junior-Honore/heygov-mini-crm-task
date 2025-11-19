const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/asyncHandler');
const AuthController = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/register', asyncHandler(AuthController.register));
router.post('/login', asyncHandler(AuthController.login));
router.get('/me', auth, asyncHandler(AuthController.me));



module.exports = router;