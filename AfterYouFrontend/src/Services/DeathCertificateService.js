// services/executorService.js
import axios from "axios";

const API = "http://localhost:8081/api/death-certificates";

export const uploadDeathCertificate = async (formData) => {
  return axios.post(`${API}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const verifyDeathCertificate = async (certId) => {
  return axios.put(`${API}/verify/${certId}`);
};

export const getCertificateByExecutor = async (executorId) => {
  return axios.get(`${API}/by-executor/${executorId}`);
};


export const verified = async (executorId) => {
  const response = await axios.get(`${API}/verified/${executorId}`);
  return response.data; // expected to be "yes" or something else
};