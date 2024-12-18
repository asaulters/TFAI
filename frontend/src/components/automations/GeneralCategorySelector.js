import React, { useState, useEffect } from 'react';
import { getGeneralAutomations } from '../../services/api';
import '../category/CategorySelector.css';

const GeneralCategorySelector = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getGeneralAutomations();
        console.log('Fetched general categories:', data);
        setCategories(data.categories || []);
      } catch (error) {
        console.error('Error fetching general categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    const categoryIndex = parseInt(event.target.value);
    setSelectedCategory(categoryIndex);
    const selectedCategoryData = categories[categoryIndex];
    onCategorySelect(selectedCategoryData);
  };

  return (
    <div className="category-selector">
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="category-dropdown"
      >
        <option value="">Select automation category</option>
        {categories.map((category, index) => {
          const categoryName = Object.keys(category)[0];
          return (
            <option key={index} value={index}>
              {categoryName}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default GeneralCategorySelector;
