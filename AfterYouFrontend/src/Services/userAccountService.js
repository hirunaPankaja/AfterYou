import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api";

// ✅ Helper function to get the token
const getAuthToken = () => {
  const token = localStorage.getItem("jwtToken");
  return token ? `Bearer ${token}` : "";
};

// ✅ Add Primary Account
export const addPrimaryAccount = async (data) => {
  try {
    console.log("Adding primary account:", data); // ✅ Debugging log

    const response = await axios.post(`${API_BASE_URL}/primary-account/add`, data, {
      headers: { Authorization: getAuthToken() },
    });

    console.log("API Response:", response.data); // ✅ Log full response
    return response.data;
  } catch (error) {
    console.error("Error adding primary account:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// ✅ Add Linked Account
export const addLinkedAccount = async (data) => {
  try {
    console.log("Adding linked account:", data); // ✅ Debugging log

    const response = await axios.post(`${API_BASE_URL}/linked-account/add`, data, {
      headers: { Authorization: getAuthToken() },
    });

    console.log("API Response:", response.data); // ✅ Log full response
    return response.data;
  } catch (error) {
    console.error("Error adding linked account:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// ✅ Get Linked Accounts by Primary ID
export const getLinkedAccounts = async (primaryId) => {
  try {
    console.log("Fetching linked accounts for primaryId:", primaryId); // ✅ Debugging log

    const response = await axios.get(`${API_BASE_URL}/linked-account/${primaryId}`, {
      headers: { Authorization: getAuthToken() },
    });

    console.log("API Response:", response.data); // ✅ Log full response
    return response.data;
  } catch (error) {
    console.error("Error fetching linked accounts:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// ✅ Get All Linked Accounts (For Admin Use)
export const getAllLinkedAccounts = async () => {
  try {
    console.log("Fetching all linked accounts..."); // ✅ Debugging log

    const response = await axios.get(`${API_BASE_URL}/linked-account/all`, {
      headers: { Authorization: getAuthToken() },
    });

    console.log("API Response:", response.data); // ✅ Log full response
    return response.data;
  } catch (error) {
    console.error("Error fetching all linked accounts:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// ✅ Get All Primary Accounts
export const getPrimaryAccounts = async () => {
  try {
    console.log("Fetching all primary accounts..."); // ✅ Debugging log

    const response = await axios.get(`${API_BASE_URL}/primary-account/all`, {
      headers: { Authorization: getAuthToken() },
    });

    console.log("API Response:", response.data); // ✅ Log full response
    return response.data;
  } catch (error) {
    console.error("Error fetching primary accounts:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// ✅ Soft Delete Linked Account
export const softDeleteLinkedAccount = async (linkedAccountId) => {
  try {
    console.log("Deleting linked account:", linkedAccountId); // ✅ Debugging log

    const response = await axios.put(`${API_BASE_URL}/linked-account/delete/${linkedAccountId}`, {}, {
      headers: { Authorization: getAuthToken() },
    });

    console.log("API Response:", response.data); // ✅ Log full response
    return response.data;
  } catch (error) {
    console.error("Error deleting linked account:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// ✅ Define API Base URL
const API_URL = "http://localhost:8081/api"; // ✅ Ensure correct backend URL

export const getPrimaryAccountsuser = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/primary-account/primary/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching primary accounts:", error);
    throw error;
  }
};


export const addSubscription = async (subscriptionData) => {
  try {
    console.log("Sending subscription data:", subscriptionData); // ✅ Debugging log

    const response = await axios.post(`${API_URL}/subscription/add`, subscriptionData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthToken(), // ✅ Include authentication token
      },
    });

    console.log("API Response:", response.data); // ✅ Log full response
    return response.data;
  } catch (error) {
    console.error("Error adding subscription:", error.response ? error.response.data : error.message);
    throw error;
  }
};

