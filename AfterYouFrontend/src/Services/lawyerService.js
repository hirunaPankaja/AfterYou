import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api/lawyers';

const lawyerService = {
    // Assign a new lawyer
    assignLawyer: async (lawyerData, userId) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/assign`, lawyerData, {
                params: { userId },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error assigning lawyer:', error);
            throw error;
        }
    },

    // Get lawyer by email and user ID
    getLawyerByEmailAndUserId: async (email, userId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/by-email-and-user`, {
                params: { email, userId },
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                return null; // Lawyer not found
            }
            console.error('Error fetching lawyer:', error);
            throw error;
        }
    },

    // Complete lawyer registration with file upload
    completeRegistration: async (email, nicNumber, idNumber, idImageFile, userId) => {
        try {
            const formData = new FormData();
            formData.append('nicNumber', nicNumber);
            formData.append('idNumber', idNumber);
            formData.append('idImage', idImageFile);
            formData.append('userId', userId);

            const response = await axios.put(
                `${API_BASE_URL}/complete-registration/${email}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error completing registration:', error);
            throw error;
        }
    },

};

export default lawyerService;