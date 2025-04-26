import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

export const addAccount = (data, token) => axios.post(`${API}/accounts`, data, {
  headers: { Authorization: `Bearer ${token}` },
});
export const getAccounts = (token) => axios.get(`${API}/accounts`, {
  headers: { Authorization: `Bearer ${token}` },
});
