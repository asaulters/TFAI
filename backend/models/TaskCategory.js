// backend/models/TaskCategory.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const JobCategory = require('./JobCategory');

const TaskCategory = sequelize.define('TaskCategory', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define associations
JobCategory.hasMany(TaskCategory, { foreignKey: 'jobCategoryId' });
TaskCategory.belongsTo(JobCategory, { foreignKey: 'jobCategoryId' });

module.exports = TaskCategory;
