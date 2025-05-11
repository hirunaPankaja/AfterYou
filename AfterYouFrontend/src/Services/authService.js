import axios from "axios";

const API =  "http://localhost:8081";

export const loginUser = (credentials) => {
  return axios.post(`${API}/login`, credentials);
};

export const refreshToken = () => axios.get(`${API}/auth/refresh`);
export const logout = (token) =>
  axios.post(`${API}/auth/logout`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
