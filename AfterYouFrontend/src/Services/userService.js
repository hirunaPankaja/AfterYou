import axios from 'axios';

const API = "http://localhost:8081";

export const getUserProfile = (userId, token) =>
  axios.post(`${API}/profile`, { userId }, {
    headers: {
      Authorization: `Bearer ${token}`,
    }   
    
  });

  
export const submitSignupData = async (data) => {
  const formDataToSend = new FormData();

  // Attach JSON (user info) as a string
  formDataToSend.append("userBasicInfo", JSON.stringify(data.userBasicInfo));

  // Attach the files
  formDataToSend.append("identityDocument", data.identityDocument);
  formDataToSend.append("selfieWithIdDocument", data.selfieWithIdDocument);

  // Send request via axios
  const response = await axios.post(`${API}/register`, formDataToSend, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

// Services/userService.js

export const registerUser = async (payload) => {
  const response = await fetch('http://localhost:8081/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('Failed to register user');
  }
  return response.json();
};

export const updateUserProfile = (userId, formData, token) => {
  return axios.put(`${API}/updateProfile/${userId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    }
  });
};

export const changePassword = async (currentPassword, newPassword, confirmPassword, token) => {
  try {
    const response = await axios.put(`${API}/changePassword`, {
      currentPassword,
      newPassword,
      confirmPassword
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      // Token is invalid - redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    throw error;
  }
};