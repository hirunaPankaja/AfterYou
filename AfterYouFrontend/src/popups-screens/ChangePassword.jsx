import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../style/ChangePassword.css';

function ChangePassword() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        setErrorMessage('');
    };

    const togglePasswordVisibility = (field) => {
        setShowPassword(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const validateForm = () => {
        if (!formData.currentPassword) {
            setErrorMessage('Current password is required');
            return false;
        }

        if (!formData.newPassword) {
            setErrorMessage('New password is required');
            return false;
        } else if (formData.newPassword.length < 8) {
            setErrorMessage('Password must be at least 8 characters');
            return false;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setErrorMessage('Passwords do not match');
            return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Here you would typically make an API call to change the password
            console.log('Password change submitted:', formData);
            setIsSuccess(true);
        }
    };

    const handleContinue = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        navigate('/');
    };

    return (
        <div className="change-password-container">
            {!isSuccess ? (
                <>
                    <h1 className="change-password-title">Change Password</h1>
                    <div className="change-password-divider"></div>

                    {/* Error message box */}
                    {errorMessage && (
                        <div className="error-comment-box">
                            <div className="error-comment-content">
                                {errorMessage}
                            </div>
                            <div className="error-comment-arrow"></div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="password-input-group">
                            <label htmlFor="currentPassword">Current Password</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showPassword.current ? "text" : "password"}
                                    id="currentPassword"
                                    name="currentPassword"
                                    value={formData.currentPassword}
                                    onChange={handleChange}
                                />
                                <span
                                    className="password-toggle"
                                    onClick={() => togglePasswordVisibility('current')}
                                >
                                    {showPassword.current ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>

                        <div className="password-input-group">
                            <label htmlFor="newPassword">New Password</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showPassword.new ? "text" : "password"}
                                    id="newPassword"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                />
                                <span
                                    className="password-toggle"
                                    onClick={() => togglePasswordVisibility('new')}
                                >
                                    {showPassword.new ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>

                        <div className="password-input-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showPassword.confirm ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                                <span
                                    className="password-toggle"
                                    onClick={() => togglePasswordVisibility('confirm')}
                                >
                                    {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>

                        <button type="submit" className="update-password-btn">
                            Update
                        </button>
                    </form>
                </>
            ) : (
                <div className="change-password-success-message">
                    <FaCheckCircle className="success-icon" />
                    <h2>Successful</h2>
                    <p>Congratulations! Your password has been changed.</p>
                    <p className="instruction">You will be redirected to the login page</p>
                    <button
                        className="continue-btn"
                        onClick={handleContinue}
                    >
                        Done
                    </button>
                </div>
            )}
        </div>
    );
}

export default ChangePassword;