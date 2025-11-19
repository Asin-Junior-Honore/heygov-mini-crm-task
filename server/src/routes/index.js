const express = require('express');
const router = express.Router();


const authRoutes = require('./authRoutes');
const contactRoutes = require('./contactRoutes');
const assistantRoutes = require('./assistantRoutes');


router.use('/auth', authRoutes);
router.use('/contacts', contactRoutes);
router.use('/assistant', assistantRoutes);


module.exports = router;