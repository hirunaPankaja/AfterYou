import React, { useState } from 'react';
import '../style/ChangePassword.css';

function ChangePassword() {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
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
        // Add your password change logic here
        console.log('Password change submitted:', formData);
        // Add API call or validation as needed
    };

    return (
        <div className="change-password-container">
            <h1 className="change-password-title">Change Password</h1>
            <form onSubmit={handleSubmit}>
                <div className="password-input-group">
                    <label htmlFor="currentPassword">Current Password</label>
                    <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="password-input-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="password-input-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="update-password-btn">
                    Update
                </button>
            </form>
        </div>
    );
}

export default ChangePassword;