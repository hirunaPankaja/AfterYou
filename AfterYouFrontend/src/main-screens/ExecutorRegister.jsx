import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../style/ExecutorRegister.css";
import executorLandingpage from "../assets/logo.png";
import { getExecutorByEmailAndUserId, completeExecutorRegistration } from '../Services/executorService.js';

const ExecutorRegister = () => {
    const { executorEmail, userId } = useParams();
    const navigate = useNavigate();
    const decodedEmail = decodeURIComponent(executorEmail);

    const [formData, setFormData] = useState({
        executorName: '',
        executorEmail: decodedEmail,
        executorIdentityProof: null,
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [executorExists, setExecutorExists] = useState(false);
    const [executorId, setExecutorId] = useState(null);

    // Simple client-side validation for file type
    const validateFile = (file) => {
        if (!file) return "Please upload an identity proof file";
        const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!validTypes.includes(file.type)) {
            return "Please upload a JPG, PNG, or PDF file";
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            return "File size should be less than 5MB";
        }
        return null;
    };

    useEffect(() => {
        const checkExecutorExists = async () => {
            try {
                if (decodedEmail && userId) {
                    const response = await getExecutorByEmailAndUserId(decodedEmail, parseInt(userId));
                    if (response.data) {
                        setFormData(prev => ({
                            ...prev,
                            executorName: response.data.executorName || '',
                            executorEmail: response.data.executorEmail || decodedEmail
                        }));
                        setExecutorId(response.data.executorId);
                        setExecutorExists(true);
                    }
                }
            } catch (err) {
                console.error('Error checking executor:', err);
                setError("Failed to verify Executor: " + (err.response?.data?.message || err.message));
            } finally {
                setIsLoading(false);
            }
        };

        checkExecutorExists();
    }, [decodedEmail, userId]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            // Validate passwords match
            if (formData.password !== formData.confirmPassword) {
                setError("Passwords do not match");
                return;
            }
            // Validate password strength
            if (formData.password.length < 8) {
                setError("Password must be at least 8 characters long");
                return;
            }

            // Validate file
            const fileError = validateFile(formData.executorIdentityProof);
            if (fileError) {
                setError(fileError);
                return;
            }

            // Complete registration
            await completeExecutorRegistration(
                executorId,
                formData.executorIdentityProof,
                formData.password
            );

            setSuccess(true);

            // Redirect after 3 seconds
            setTimeout(() => {
                navigate('/login'); // Or your desired redirect path
            }, 3000);
        } catch (err) {
            setError("Registration failed: " + (err.response?.data?.message || err.message));
            console.error('Registration error:', err);
        }
    };


    if (isLoading) return <div className="executor-register-loading">Loading...</div>;
    if (!executorExists) return <div className="executor-register-not-found">Executor not found or not assigned</div>;

    return (
        <div className="executor-register-landing-page">
            {/* ✅ Logo and Title Added to Background Page */}
            <div className="executor-register-background-header">
                <img src={executorLandingpage} alt="Logo" className="executor-register-logo" />
                <h2 className="executor-register-title">
                    <span className="after">After</span> <span className="you">You</span>
                </h2>
            </div>

            <div className="executor-register-form">
                <h2>Executor Register</h2>

                {error && <div className="executor-register-error">{error}</div>}

                {success ? (
                    <div className="executor-register-success">
                        <p>Registration completed successfully!</p>
                        <p>You will be redirected shortly...</p>
                    </div>
                ) : (
                    <form className="executor-register-form-content" onSubmit={handleSubmit}>
                        <div className="executor-register-row">
                            <span className="executor-register-label">Executor Name</span>
                            <span className="executor-register-value">{formData.executorName}</span>
                        </div>

                        <div className="executor-register-row">
                            <span className="executor-register-label">Executor Email</span>
                            <span className="executor-register-value">{formData.executorEmail}</span>
                        </div>

                        <div className="executor-register-row">
                            <label className="executor-register-label">Create Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="executor-register-input"
                                required
                                minLength="8"
                            />
                        </div>

                        <div className="executor-register-row">
                            <label className="executor-register-label">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="executor-register-input"
                                required
                                minLength="8"
                            />
                        </div>

                        <div className="executor-register-row">
                            <lable className="executor-register-label">Upload Identity Proof (NIC/Passport) </lable>
                            <input
                                type="file"
                                name="executorIdentityProof"
                                className="executor-register-file-input"
                                onChange={handleChange}
                                accept="image/*,.pdf"
                                required
                            />
                            <small>Accepted formats: JPG, PNG, PDF</small>
                        </div>

                        <button type="submit" className="executor-register-submit">
                            Submit
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ExecutorRegister;