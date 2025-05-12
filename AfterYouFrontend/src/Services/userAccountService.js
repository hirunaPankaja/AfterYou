import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api";

// ✅ Helper function to get the token
const getAuthToken = () => {
  const token = localStorage.getItem("jwtToken");
  return token ? `Bearer ${token}` : "";
};

// ✅ Add Primary Account
export const addPrimaryAccount = (data) => {
  return axios.post(`${API_BASE_URL}/primary-account/add`, data, {
    headers: {
      Authorization: getAuthToken(),
    },
  });
};

// ✅ Add Linked Account
export const addLinkedAccount = (data) => {
  return axios.post(`${API_BASE_URL}/linked-account/add`, data, {
    headers: {
      Authorization: getAuthToken(),
    },
  });
};

// ✅ Get Linked Accounts by Primary ID
export const getLinkedAccounts = (primaryId) => {
  return axios.get(`${API_BASE_URL}/linked-account/${primaryId}`, {
    headers: {
      Authorization: getAuthToken(),
    },
  });
};

// ✅ Get All Primary Accounts
export const getPrimaryAccounts = () => {
  return axios.get(`${API_BASE_URL}/primary-account/all`, {
    headers: {
      Authorization: getAuthToken(),
    },
  });
};
