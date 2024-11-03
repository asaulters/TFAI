// backend/routes/jobCategoryRoutes.js
const express = require('express');
const router = express.Router();
const jobCategoryController = require('../controllers/jobCategoryController');

router.get('/', jobCategoryController.getAllJobCategories);
router.get('/:id', jobCategoryController.getJobCategoryById);

module.exports = router;
