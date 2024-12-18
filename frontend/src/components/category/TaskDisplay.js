import React, { useState } from 'react';
import AutomationModal from '../modal/AutomationModal';
import './TaskDisplay.css';

const TaskDisplay = ({ category }) => {
  const [selectedAutomation, setSelectedAutomation] = useState(null);

  if (!category) return null;

  const categoryName = Object.keys(category)[0];
  const tasks = category[categoryName];

  return (
    <div className="task-display">
      <h3 className="category-title">{categoryName}</h3>
      <div className="tasks-grid">
        {tasks.map((task, index) => (
          <div 
            key={index} 
            className="task-card"
            onClick={() => setSelectedAutomation(task)}
          >
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            {task.difficulty && (
              <div className="task-meta">
                <span className="difficulty">Difficulty: {task.difficulty}</span>
                {task.setupTime && (
                  <span className="setup-time">Setup: {task.setupTime}</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedAutomation && (
        <AutomationModal
          automation={{
            ...selectedAutomation,
            description: selectedAutomation.full_description || selectedAutomation.description
          }}
          onClose={() => setSelectedAutomation(null)}
        />
      )}
    </div>
  );
};

export default TaskDisplay;
