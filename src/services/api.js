const API_BASE_URL = 'http://localhost:3000';

export const fetchData = async () => {
  const response = await fetch(`${API_BASE_URL}/api/data`);
  return response.json();
};