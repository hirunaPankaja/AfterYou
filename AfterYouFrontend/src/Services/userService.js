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

