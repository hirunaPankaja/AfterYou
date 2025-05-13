import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api/executors";




// Helper function to get the token
const getAuthToken = () => {
    const token = localStorage.getItem("jwtToken");
    return token ? `Bearer ${token}` : "";
};

// ✅ Assign a new executor
export const assignExecutor = (executorData, userId) => {
    return axios.post(`${API_BASE_URL}/assign`, executorData, {

        params: { userId },
        headers: {
            "Content-Type": "application/json",
            Authorization: getAuthToken()
        }
    });
};

// ✅ Get executor by email and user ID
export const getExecutorByEmailAndUserId = (email, userId) => {
    return axios.get(`${API_BASE_URL}/by-email-and-user`, {
        params: {
            email: email,
            userId: userId
        },
        headers: {
            Authorization: getAuthToken()
        }
    });
};

// ✅ Complete executor registration with file upload (updated version)
export const completeExecutorRegistration = (executorEmail, userId, identityProof, password) => {
    const formData = new FormData();
    formData.append("nicImage", identityProof);
    formData.append("password", password);

    return axios.put(
        `${API_BASE_URL}/complete-registration/${encodeURIComponent(executorEmail)}/${userId}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: getAuthToken()
            }
        }
    );
};

// ✅ Get all executors assigned by a specific user
export const getExecutorsByUserId = (userId) => {
    return axios.get(`${API_BASE_URL}/user/${userId}`, {
        headers: {
            Authorization: getAuthToken()
        }
    });
};

// ✅ Send verification email to executor
export const sendExecutorVerification = (executorId) => {
    return axios.post(
        `${API_BASE_URL}/send-verification/${executorId}`,
        {},
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: getAuthToken()
            }
        }
    );
};