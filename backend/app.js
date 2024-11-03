// backend/app.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

// Import routes
const jobCategoryRoutes = require('./routes/jobCategoryRoutes');
const taskCategoryRoutes = require('./routes/taskCategoryRoutes');
const automationTaskRoutes = require('./routes/automationTaskRoutes');
const errorHandler = require('./middleware/errorHandler');

// Import models
require('./models/JobCategory');
require('./models/TaskCategory');
require('./models/AutomationTask');

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/job-categories', jobCategoryRoutes);
app.use('/api/task-categories', taskCategoryRoutes);
app.use('/api/automation-tasks', automationTaskRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Sync Database and Start Server
sequelize
  .sync({ force: false }) // Set to 'true' if you want to drop and recreate tables each time
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
