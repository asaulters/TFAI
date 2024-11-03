// src/components/category/TaskOutput.js

import React from 'react';

function TaskOutput({ taskCategories }) {
  if (!taskCategories || taskCategories.length === 0) {
    return <p>No task categories available.</p>;
  }

  return (
    <div>
      {taskCategories.map((category) => (
        <div key={category.id}>
          <h2>{category.name}</h2>
          {category.AutomationTasks && category.AutomationTasks.length > 0 ? (
            <ul>
              {category.AutomationTasks.map((task) => (
                <li key={task.id}>
                  <strong>{task.name}</strong>
                  <p>{task.description}</p>
                  <p><em>Tools: {task.tools}</em></p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No automation tasks available for this category.</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default TaskOutput;
