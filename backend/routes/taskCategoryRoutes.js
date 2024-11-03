// backend/routes/taskCategoryRoutes.js

const express = require('express');
const router = express.Router();
const taskCategoryController = require('../controllers/taskCategoryController');

// Define the routes
router.get('/', taskCategoryController.getTaskCategoriesByJobCategory);
router.get('/:id', taskCategoryController.getTaskCategoryById);

module.exports = router;
