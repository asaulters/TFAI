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
const emailRoutes = require('./routes/emailRoutes');

// Import models
require('./models/JobCategory');
require('./models/TaskCategory');
require('./models/AutomationTask');

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/job-categories', jobCategoryRoutes);
app.use('/api/task-categories', taskCategoryRoutes);
app.use('/api/automation-tasks', automationTaskRoutes);
app.use('/api/email', emailRoutes);

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend server is running' });
});

// Error Handling Middleware
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  console.log('404 Not Found:', req.method, req.url);
  res.status(404).json({ error: 'Not Found' });
});

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
