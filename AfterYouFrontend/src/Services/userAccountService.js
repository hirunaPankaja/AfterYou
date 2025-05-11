import axios from "axios";

const API = "http://localhost:8081/api/primary-account";

export const addPrimaryAccount = (data, token) => {
  return axios.post(`${API}/add`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
