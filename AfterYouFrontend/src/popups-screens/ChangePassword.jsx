import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../style/ChangePassword.css';
import {changePassword} from '../Services/userService'

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
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
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

        if (!/[A-Z]/.test(formData.newPassword)) {
            setErrorMessage('Password must contain at least one uppercase letter');
            return false;
        }

        if (!/[a-z]/.test(formData.newPassword)) {
            setErrorMessage('Password must contain at least one lowercase letter');
            return false;
        }

        if (!/[0-9]/.test(formData.newPassword)) {
            setErrorMessage('Password must contain at least one number');
            return false;
        }

        if (!/[!@#$%^&*]/.test(formData.newPassword)) {
            setErrorMessage('Password must contain at least one special character');
            return false;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setErrorMessage('Passwords do not match');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const token = localStorage.getItem('jwtToken');
            console.log("token", token);
            await changePassword(
                formData.currentPassword,
                formData.newPassword,
                formData.confirmPassword,
                token
            );
            setIsSuccess(true);
        } catch (error) {
            if (error.response) {
                // Backend returned an error response
                setErrorMessage(error.response.data || 'Password change failed');
            } else if (error.request) {
                // Request was made but no response received
                setErrorMessage('Network error. Please try again.');
            } else {
                // Something happened in setting up the request
                setErrorMessage('An error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleContinue = () => {
        // Optional: You may want to keep the user logged in after password change
        navigate('/login/user'); // Or wherever you want to redirect
    };

    return (
        <div className="change-password-container">
            {!isSuccess ? (
                <>
                    <h1 className="change-password-title">Change Password</h1>
                    <div className="change-password-divider"></div>

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
                                    disabled={isLoading}
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
                                    disabled={isLoading}
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
                                    disabled={isLoading}
                                />
                                <span
                                    className="password-toggle"
                                    onClick={() => togglePasswordVisibility('confirm')}
                                >
                                    {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="update-password-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Updating...' : 'Update'}
                        </button>
                    </form>
                </>
            ) : (
                <div className="change-password-success-message">
                    <FaCheckCircle className="success-icon" />
                    <h2>Successful</h2>
                    <p>Congratulations! Your password has been changed.</p>
                    <button
                        className="continue-btn"
                        onClick={handleContinue}
                    >
                        Continue
                    </button>
                </div>
            )}
        </div>
    );
}

export default ChangePassword;