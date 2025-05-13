import React, { useState, useEffect } from "react";
import "../style/EditUserDetailsForm.css";
import { getUserProfile, updateUserProfile } from "../Services/userService";

const EditUserDetailsForm = ({ onClose, onSave }) => {
    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({
        address: "",
        mobile: ""
    });

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('jwtToken');

        getUserProfile(userId, token)
            .then(response => {
                const user = response.data;
                setProfile(user);
                setFormData({
                    address: user.address || "",
                    mobile: user.mobile || ""
                });
            })
            .catch(error => {
                console.error("Error fetching user profile:", error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("jwtToken");

        const data = new FormData();
        data.append("address", formData.address);
        data.append("mobile", formData.mobile);

        updateUserProfile(userId, data, token)
            .then(() => {
                onSave(); // Notify parent to refresh
            })
            .catch(err => {
                console.error("Error updating user profile:", err);
            });
    };

    return (
        <div className="edit-form-overlay">
            <div className="edit-form-container">
                <button className="edit-form-close-btn" onClick={onClose}>×</button>
                <h2>Edit Personal Details</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows="3"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Mobile</label>
                        <input
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" className="cancel-btn" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="save-btn">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUserDetailsForm;
