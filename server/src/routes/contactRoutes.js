const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/contactController');
const asyncHandler = require('../utils/asyncHandler');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);


router.post('/', asyncHandler(ContactController.create));
router.get('/', asyncHandler(ContactController.list));
router.get('/search', asyncHandler(ContactController.search));
router.get('/:id', asyncHandler(ContactController.get));
router.put('/:id', asyncHandler(ContactController.update));
router.post('/:id/activity', asyncHandler(ContactController.addActivity));


module.exports = router;