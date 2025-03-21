export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const apiConfig = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
};

// Add a helper function to check connection
export const testConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/test`);
    const data = await response.json();
    console.log('Connection test:', data);
    return data;
  } catch (error) {
    console.error('Connection error:', error);
    throw error;
  }
}; 