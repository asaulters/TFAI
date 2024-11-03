import React, { useState, useEffect } from 'react';
import { getCategories } from '../../services/api';
import TaskModal from './TaskModal';
import './TaskDisplay.css';

const TaskDisplay = ({ categoryIndex }) => {
  const [categories, setCategories] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategories();
        setCategories(data.categories || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  if (!categoryIndex || categories.length === 0) {
    return <p>Please select a business type to see available tasks.</p>;
  }

  const selectedCategory = categories[categoryIndex];
  if (!selectedCategory) {
    return <p>No tasks available for the selected category.</p>;
  }

  const categoryName = Object.keys(selectedCategory)[0];
  const tasks = selectedCategory[categoryName];

  return (
    <div className="task-display">
      <h2>Available Tasks for {categoryName}</h2>
      {tasks.map((task, index) => (
        <div key={index} className="task-category">
          <h3>{task.category}</h3>
          <ul className="task-list">
            <li className="task-item" onClick={() => handleTaskClick(task)}>
              <div className="task-icon">
                <span className="icon-placeholder">●</span>
              </div>
              <div className="task-content">
                <h4>{task.title}</h4>
                <p>{task.description.substring(0, 100)}...</p>
              </div>
            </li>
          </ul>
        </div>
      ))}
      {selectedTask && (
        <TaskModal task={selectedTask} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default TaskDisplay;
