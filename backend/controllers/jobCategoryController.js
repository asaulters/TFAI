// backend/controllers/jobCategoryController.js
const JobCategory = require('../models/JobCategory');
const TaskCategory = require('../models/TaskCategory');

// Get all job categories
exports.getAllJobCategories = async (req, res, next) => {
  try {
    const jobCategories = await JobCategory.findAll();
    res.json(jobCategories);
  } catch (error) {
    next(error);
  }
};

// Get a specific job category with its task categories
exports.getJobCategoryById = async (req, res, next) => {
  try {
    const jobCategory = await JobCategory.findByPk(req.params.id, {
      include: TaskCategory,
    });
    if (jobCategory) {
      res.json(jobCategory);
    } else {
      res.status(404).json({ message: 'Job category not found' });
    }
  } catch (error) {
    next(error);
  }
};
