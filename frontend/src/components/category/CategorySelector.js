import React, { useState, useEffect } from 'react';
import { getCategories } from '../../services/api';
import './CategorySelector.css';

const CategorySelector = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        console.log('Fetched categories:', data.categories);
        setCategories(data.categories || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    const categoryIndex = parseInt(event.target.value);
    setSelectedCategory(categoryIndex);
    const selectedCategoryData = categories[categoryIndex];
    console.log('Selected category data:', selectedCategoryData);
    onCategorySelect(selectedCategoryData);
  };

  return (
    <div className="category-selector">
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="category-dropdown"
      >
        <option value="">Select your business type</option>
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

export default CategorySelector;
