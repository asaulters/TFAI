// backend/routes/automationTaskRoutes.js

const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  getAutomationTasksByTaskCategory,
  getCategories,
  getGeneralAutomations
} = require('../controllers/automationTaskController');

// Define the routes
router.get('/categories', getCategories);
router.get('/all-categories', getAllCategories);
router.get('/tasks', getAutomationTasksByTaskCategory);
router.get('/general', getGeneralAutomations);

module.exports = router;
