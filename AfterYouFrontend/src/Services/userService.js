import axios from 'axios';

const API = "http://localhost:8081";

export const getUserProfile = (userId, token) =>
  axios.post(`${API}/profile`, { userId }, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
