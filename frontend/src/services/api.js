// src/services/api.js

const API_BASE_URL = 'http://localhost:5001/api';

// Function to get all categories (job categories, task categories, and automation tasks)
export const getCategories = async () => {
  try {
    console.log('Fetching from:', `${API_BASE_URL}/automation-tasks/categories`); // Debug log
    const response = await fetch(`${API_BASE_URL}/automation-tasks/categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const data = await response.json();
    console.log('API response data:', data); // Debug log
    console.log('Number of categories:', data.categories?.length); // Debug log
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return { categories: [] };
  }
};

// Function to get automation tasks by task category ID
export const getAutomationTasksByTaskCategory = async (taskCategoryId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/automation-tasks/tasks?taskCategoryId=${taskCategoryId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch automation tasks');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching automation tasks:', error);
    return [];
  }
};
