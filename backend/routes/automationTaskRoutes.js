// backend/routes/automationTaskRoutes.js

const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  getAutomationTasksByTaskCategory,
  getCategories
} = require('../controllers/automationTaskController');

// Define the routes
router.get('/categories', getCategories);
router.get('/all-categories', getAllCategories);
router.get('/tasks', getAutomationTasksByTaskCategory);

module.exports = router;
