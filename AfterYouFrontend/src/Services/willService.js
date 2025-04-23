import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

export const uploadCertificate = (formData, token) => axios.post(`${API}/documents/upload`, formData, {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  },
});
export const initiateExecution = (token) => axios.post(`${API}/execution/start`, {}, {
  headers: { Authorization: `Bearer ${token}` },
});
