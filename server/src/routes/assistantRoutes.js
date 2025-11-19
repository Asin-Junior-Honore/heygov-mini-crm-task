const express = require('express');
const router = express.Router();
const AssistantController = require('../controllers/assistantController');
const asyncHandler = require('../utils/asyncHandler');
const authMiddleware = require('../middleware/authMiddleware');


router.use(authMiddleware);
router.post('/', asyncHandler(AssistantController.handle));


module.exports = router;