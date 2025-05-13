import axios from "axios";

const API = "http://localhost:8081/api/executors";

export const loginExecutor = (credentials) => {
  return axios.post(`${API}/executor/login`, credentials);
}

export const getExecutorProfileByEmail = (email) => {
  return axios.get(`${API}/profile/by-email`, {
    params: { email },
  });
};