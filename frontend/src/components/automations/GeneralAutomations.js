import React, { useState } from 'react';
import GeneralCategorySelector from './GeneralCategorySelector';
import TaskDisplay from '../category/TaskDisplay';
import './GeneralAutomations.css';

const GeneralAutomations = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (categoryData) => {
    console.log('Selected general category:', categoryData);
    setSelectedCategory(categoryData);
  };

  return (
    <div className="general-automations">
      <GeneralCategorySelector onCategorySelect={handleCategorySelect} />
      {selectedCategory && <TaskDisplay category={selectedCategory} />}
    </div>
  );
};

export default GeneralAutomations;