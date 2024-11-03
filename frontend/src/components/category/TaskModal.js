import React from 'react';
import './TaskModal.css';

const TaskModal = ({ task, onClose }) => {
  return (
    <div className="task-modal-overlay" onClick={onClose}>
      <div className="task-modal-content" onClick={e => e.stopPropagation()}>
        <h2>{task.name}</h2>
        <p>{task.description}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TaskModal;
