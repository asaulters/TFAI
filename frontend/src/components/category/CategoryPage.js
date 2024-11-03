// frontend/src/components/category/CategoryPage.js

import React, { useState } from 'react';
import CategorySelector from './CategorySelector';
import { getCategories } from '../../services/api';
import './CategoryPage.css';

const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = async (categoryIndex) => {
    try {
      const data = await getCategories();
      const categoryData = data.categories[categoryIndex];
      const categoryName = Object.keys(categoryData)[0];
      const automations = categoryData[categoryName];

      console.log('Selected category:', categoryName);
      console.log('Automations:', automations);

      setSelectedCategory({
        name: categoryName,
        automations: automations
      });
    } catch (error) {
      console.error('Error handling category selection:', error);
    }
  };

  return (
    <div className="category-page">
      <h1>Select Your Business Type</h1>
      <CategorySelector onCategorySelect={handleCategorySelect} />
      
      {selectedCategory && (
        <div className="category-details">
          <h2>{selectedCategory.name}</h2>
          <div className="automations-list">
            <h3>Available Automations:</h3>
            <ul>
              {selectedCategory.automations.map((automation, index) => (
                <li key={index}>
                  <h4>{automation.title}</h4>
                  <p>{automation.description}</p>
                  <div className="tools">
                    <strong>Tools:</strong> {automation.tools.join(', ')}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;