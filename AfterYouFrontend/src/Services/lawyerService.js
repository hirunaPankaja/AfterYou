import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api/lawyers";

// Helper function to get the token
const getAuthToken = () => {
    const token = localStorage.getItem("jwtToken");
    return token ? `Bearer ${token}` : "";
};

// ✅ Assign a new lawyer
export const assignLawyer = (lawyerData, userId) => {
    return axios.post(`${API_BASE_URL}/assign`, lawyerData, {
        params: { userId },
        headers: {
            "Content-Type": "application/json",
            Authorization: getAuthToken()
        }
    });
};

// ✅ Get lawyer by email and user ID
export const getLawyerByEmailAndUserId = (email, userId) => {
    return axios.get(`${API_BASE_URL}/by-email-and-user`, {
        params: { email, userId },
        headers: {Authorization: getAuthToken()
        }
    });
};

// ✅ Complete registration
export const completeRegistration = (email, data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
    });

    return axios.put(`${API_BASE_URL}/complete-registration/${email}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: getAuthToken()
            }
        }
    );
};