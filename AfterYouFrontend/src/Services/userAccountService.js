import axios from "axios";

const API = "http://localhost:8080/api/user-account";

export const addPrimaryAccount = (data) => {
  return axios.post(`${API}/add-primary`, data);
};
