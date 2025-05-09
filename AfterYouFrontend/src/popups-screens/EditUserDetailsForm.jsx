import React, { useState } from "react";
import "../style/EditUserDetailsForm.css";

const EditUserDetailsForm = ({ userData, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: userData.name || "Shey Silva",
        gender: userData.gender || "Female",
        age: userData.age || "26",
        nic: userData.nic || "200072348138",
        dob: userData.dob || "17/08/2000",
        address: userData.address || "761, Park Street, Colombo 08.",
        email: userData.email || "Siva@gmail.com",
        mobile: userData.mobile || "077 8564632"
    });

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
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group-gender">
                            <label>Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
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
                                value={formData.nic}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Date of Birth</label>
                            <input
                                type="text"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
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
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Mobile</label>
                            <input
                                type="tel"
                                name="mobile"
                                value={formData.mobile}
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