import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

export const registerUser = (userData) => axios.post(`${API}/users/register`, userData);
export const loginUser = (credentials) => axios.post(`${API}/auth/login`, credentials);
export const getUserProfile = (token) => axios.get(`${API}/users/profile`, {
  headers: { Authorization: `Bearer ${token}` },
});
