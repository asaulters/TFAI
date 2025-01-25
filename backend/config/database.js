// backend/config/database.js
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.NODE_ENV === 'production' 
    ? path.join('/data', 'database.sqlite')
    : path.join(__dirname, '..', 'database.sqlite'),
  logging: process.env.NODE_ENV === 'production' ? false : console.log,
});

module.exports = sequelize;
