import axios from 'axios';

const API = "http://localhost:8081";

export const getUserProfile = (userId, token) =>
  axios.post(`${API}/profile`, { userId }, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  export const submitSignupData = async (formData) => {
  const formDataToSend = new FormData();

  formDataToSend.append("userBasicInfo", JSON.stringify(formData.userBasicInfo));
  formDataToSend.append("accountSecurity", JSON.stringify(formData.accountSecurity));
  formDataToSend.append("identity", JSON.stringify(formData.identity));



  const response = await axios.post("http://localhost:8081/register", formDataToSend, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  });

  return response.data;
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