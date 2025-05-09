import React, { useState } from "react";
import "../style/EditExecutorForm.css";

const EditExecutorForm = ({ executorData, onClose, onSave, onRemove }) => {
    const [formData, setFormData] = useState({
        name: executorData.name || "",
        dob: executorData.dob || "",
        nic: executorData.nic || "",
        email: executorData.email || "",
        mobile: executorData.mobile || ""
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
        onSave({
            executorName: formData.name,
            executorDob: formData.dob,
            executorNic: formData.nic,
            executorEmail: formData.email,
            executorMobile: formData.mobile
        });
    };

    return (
        <div className="executor-form-overlay">
            <div className="executor-form-container">
                <button className="executor-form-close-btn" onClick={onClose}>×</button>
                <h2>Edit Executor Details</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Executor's full name"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Date of Birth</label>
                            <input
                                type="text"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                placeholder="DD/MM/YYYY"
                            />
                        </div>

                        <div className="form-group">
                            <label>NIC</label>
                            <input
                                type="text"
                                name="nic"
                                value={formData.nic}
                                onChange={handleChange}
                                placeholder="National ID number"
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="executor@example.com"
                            />
                        </div>

                        <div className="form-group">
                            <label>Mobile</label>
                            <input
                                type="tel"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                placeholder="077 1234567"
                            />
                        </div>
                    </div>

                    <div className="executor-form-actions">
                        <button
                            type="button"
                            className="remove-btn"
                            onClick={onRemove}
                            disabled={!executorData.name}
                        >
                            Remove Executor
                        </button>
                        <div className="action-buttons">
                            <button type="button" className="cancel-btn" onClick={onClose}>
                                Cancel
                            </button>
                            <button type="submit" className="save-btn">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditExecutorForm;