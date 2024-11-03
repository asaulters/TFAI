// backend/controllers/taskCategoryController.js

const TaskCategory = require('../models/TaskCategory');
const AutomationTask = require('../models/AutomationTask');

// Get all task categories for a specific job category, including tasks
const getTaskCategoriesByJobCategory = async (req, res) => {
  try {
    const jobCategoryId = req.query.jobCategoryId;

    if (!jobCategoryId) {
      return res.status(400).json({ message: 'Job category ID is required' });
    }

    const taskCategories = await TaskCategory.findAll({
      where: { jobCategoryId },
      include: [
        {
          model: AutomationTask,
          as: 'AutomationTasks',
        },
      ],
    });

    if (taskCategories.length > 0) {
      res.status(200).json(taskCategories);
    } else {
      res.status(200).json({ message: 'No task categories available for this job category.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving task categories', error: error.message });
  }
};

const getTaskCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const taskCategory = await TaskCategory.findByPk(id, {
      include: [{ model: AutomationTask }],
    });

    if (taskCategory) {
      res.status(200).json(taskCategory);
    } else {
      res.status(404).json({ message: 'Task category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error getting task category', error: error.message });
  }
};

module.exports = {
  getTaskCategoriesByJobCategory,
  getTaskCategoryById,
};
