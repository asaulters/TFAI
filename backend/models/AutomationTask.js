// backend/models/AutomationTask.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const TaskCategory = require('./TaskCategory');

const AutomationTask = sequelize.define('AutomationTask', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  tools: {
    type: DataTypes.STRING,
  },
});

// Define associations
TaskCategory.hasMany(AutomationTask, { foreignKey: 'taskCategoryId' });
AutomationTask.belongsTo(TaskCategory, { foreignKey: 'taskCategoryId' });

module.exports = AutomationTask;
