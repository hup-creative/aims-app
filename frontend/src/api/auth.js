import api from '../utils/api';

// Register user
export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

// Login user
export const login = async (userData) => {
  const response = await api.post('/auth/login', userData);
  return response.data;
};

// Get user profile
export const getProfile = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};