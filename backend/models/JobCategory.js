// backend/models/JobCategory.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const JobCategory = sequelize.define('JobCategory', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = JobCategory;
