// Foods Routes (Assignment 14/15)
const express = require('express');
const router = express.Router();
const foodsController = require('../controllers/foodsController');

router.get('/', foodsController.getAllFoods);
router.post('/', foodsController.createFood);

module.exports = router;
