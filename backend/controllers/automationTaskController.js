// backend/controllers/automationTaskController.js
const JobCategory = require('../models/JobCategory');
const TaskCategory = require('../models/TaskCategory');
const AutomationTask = require('../models/AutomationTask');
const path = require('path');
const fs = require('fs').promises;

// Get all job categories with their task categories and automation tasks
const getAllCategories = async (req, res, next) => {
  try {
    const jobCategories = await JobCategory.findAll({
      include: [
        {
          model: TaskCategory,
          include: [AutomationTask],
        },
      ],
    });

    if (jobCategories.length > 0) {
      res.json(jobCategories);
    } else {
      res.status(200).json({ message: 'No categories found.' });
    }
  } catch (error) {
    next(error);
  }
};

// Get all automation tasks for a specific task category
const getAutomationTasksByTaskCategory = async (req, res, next) => {
  try {
    const { taskCategoryId } = req.query;

    if (!taskCategoryId) {
      return res.status(400).json({ message: 'Task category ID is required' });
    }

    const automationTasks = await AutomationTask.findAll({
      where: { taskCategoryId },
    });

    if (automationTasks.length > 0) {
      res.json(automationTasks);
    } else {
      res.status(200).json({ message: 'No automation tasks found for this task category.' });
    }
  } catch (error) {
    next(error);
  }
};

// Get categories from data.json
const getCategories = async (req, res) => {
  try {
    // Read the data.json file
    const dataPath = path.join(__dirname, '../seeders/data.json');
    const rawData = await fs.readFile(dataPath, 'utf8');
    const data = JSON.parse(rawData);
    
    // Flatten the categories array
    const flattenedCategories = [];
    data.categories.forEach(categoryObj => {
      // Get all business types in this category object
      const businessTypes = Object.keys(categoryObj);
      
      // Create a separate category object for each business type
      businessTypes.forEach(businessType => {
        flattenedCategories.push({
          [businessType]: categoryObj[businessType]
        });
      });
    });
    
    // Create the restructured response
    const restructuredData = {
      categories: flattenedCategories
    };
    
    console.log('Original categories count:', data.categories.length);
    console.log('Flattened categories count:', flattenedCategories.length);
    console.log('Business types:', flattenedCategories.map(cat => Object.keys(cat)[0]));
    
    res.json(restructuredData);
  } catch (error) {
    console.error('Error reading categories:', error);
    res.status(500).json({ error: 'Failed to get categories' });
  }
};

module.exports = {
  getAllCategories,
  getAutomationTasksByTaskCategory,
  getCategories
};
