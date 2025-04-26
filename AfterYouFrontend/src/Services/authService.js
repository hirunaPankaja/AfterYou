import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

export const refreshToken = () => axios.get(`${API}/auth/refresh`);
export const logout = (token) => axios.post(`${API}/auth/logout`, {}, {
  headers: { Authorization: `Bearer ${token}` },
});