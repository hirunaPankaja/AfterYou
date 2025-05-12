import React, { useState } from "react";
import "../style/EditUserDetailsForm.css";
import { getUserProfile } from "../Services/userService";
import { useEffect } from "react";

const EditUserDetailsForm = ({ userData, onClose, onSave }) => {
   const [profile, setProfile] = useState(null);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('jwtToken');

        getUserProfile(userId, token)
            .then(response => {
                setProfile(response.data);
            })
            .catch(error => {
                console.error("Error fetching user profile:", error);
            });
    }, []);

    return (
        <div className="edit-form-overlay">
            <div className="edit-form-container">
                <button className="edit-form-close-btn" onClick={onClose}>×</button>
                <h2>Edit Personal Details</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={profile?.firstName + " " + profile?.lastName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group-gender">
                            <label>Gender</label>
                            <select
                                name="gender"
                                value={profile?.gender}
                                onChange={handleChange}
                            >
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>NIC</label>
                            <input
                                type="text"
                                name="nic"
                                value={profile?.nic}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Date of Birth</label>
                            <input
                                type="text"
                                name="dob"
                                value={profile?.dob}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Address</label>
                        <textarea
                            name="address"
                            value={profile?.address}
                            onChange={handleChange}
                            rows="3"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={profile?.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Mobile</label>
                            <input
                                type="tel"
                                name="mobile"
                                value={profile?.mobile}
                                onChange={handleChange}
                            />
                        </div>
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