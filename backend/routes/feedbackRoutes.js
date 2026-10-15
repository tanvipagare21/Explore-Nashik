// Feedback Routes (Assignment 14/15)
const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

router.post('/', feedbackController.submitFeedback);

module.exports = router;
