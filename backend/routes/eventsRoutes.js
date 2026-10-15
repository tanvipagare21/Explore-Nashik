// Events Routes (Assignment 14/15)
const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');

router.get('/', eventsController.getAllEvents);
router.post('/', eventsController.createEvent);

module.exports = router;
