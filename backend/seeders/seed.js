// backend/seeders/seed.js

const sequelize = require('../config/database');
const JobCategory = require('../models/JobCategory');
const TaskCategory = require('../models/TaskCategory');
const AutomationTask = require('../models/AutomationTask');
const data = require('./data.json');

async function seedDatabase() {
  try {
    await sequelize.sync({ force: true });

    for (const category of data.categories) {
      const categoryName = Object.keys(category)[0];
      const jobCategory = await JobCategory.create({ name: categoryName });

      for (const task of category[categoryName]) {
        const taskCategory = await TaskCategory.create({
          name: task.category,
          jobCategoryId: jobCategory.id,
        });

        await AutomationTask.create({
          name: task.title,
          description: task.description,
          tools: JSON.stringify(task.tools),
          steps: JSON.stringify(task.steps),
          benefits: JSON.stringify(task.benefits),
          taskCategoryId: taskCategory.id,
        });
      }
    }

    console.log('Database seeded successfully.');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
