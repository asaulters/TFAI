// backend/config/database.js
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

// Ensure the database directory exists
const dbPath = process.env.NODE_ENV === 'production' 
  ? '/opt/render/project/src/data'  // Use Render's project directory instead of root /data
  : path.join(__dirname, '..');

// Create the directory if it doesn't exist
if (!fs.existsSync(dbPath)) {
  fs.mkdirSync(dbPath, { recursive: true });
}

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(dbPath, 'database.sqlite'),
  logging: process.env.NODE_ENV === 'production' ? false : console.log,
});

module.exports = sequelize;
