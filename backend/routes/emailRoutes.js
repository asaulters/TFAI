const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');
const mailchimpController = require('../controllers/mailchimpController');

router.post('/contact', emailController.sendContactEmail);
router.post('/subscribe', mailchimpController.addSubscriber);

module.exports = router;
