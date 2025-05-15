import React, { useState, useRef } from "react";
import { FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";
import { requestPasswordReset, verifyResetCode } from "../Services/userService";
import logo from "../assets/logo.png";
import "../style/ForgotPassword.css";

const ForgotPassword = ({ onClose }) => {
    const [email, setEmail] = useState("");
    const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
    const [otp, setOtp] = useState(["", "", "", "", ""]);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState({
        newPassword: false,
        confirmPassword: false
    });
    const otpInputs = useRef([]);

    // Step 1: Email submission
    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await requestPasswordReset(email);
            setStep(2);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Step 2: OTP submission
    const handleOtpSubmit = (e) => {
        e.preventDefault();
        setStep(3);
    };

    // Step 3: Password reset submission
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        setLoading(true);
        setError("");
        try {
            const otpCode = otp.join('');
            await verifyResetCode(email, otpCode, password, confirmPassword);
            setShowSuccess(true);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // OTP input handlers
    const handleOtpChange = (index, value) => {
        if (/^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value && index < 4 && otpInputs.current[index + 1]) {
                otpInputs.current[index + 1].focus();
            }
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0 && otpInputs.current[index - 1]) {
            otpInputs.current[index - 1].focus();
        }
    };

    const handleResendEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await requestPasswordReset(email);
            setError("New verification code sent");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDone = () => {
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="forgot-password-box">
                <div className="modal-header">
                    <img src={logo} alt="Logo" className="forgot-password-logo" />
                    <h1 className="modal-title">
                        <span className="highlight">After</span> You
                    </h1>
                </div>

                <div className="forgot-password-modal-content">
                    {showSuccess ? (
                        // Success Message
                        <div className="success-message">
                            <FaCheckCircle className="success-icon" />
                            <h2 className="success-title">Successful</h2>
                            <p className="success-text">
                                Congratulations! Your password has been changed.
                                <br />
                                Click continue to login
                            </p>
                            <button
                                className="success-button"
                                onClick={handleDone}
                            >
                                Done
                            </button>
                        </div>
                    ) : step === 1 ? (
                        // Step 1: Email Entry
                        <>
                            <h2 className="form-title">Forgot Password</h2>
                            <hr className="forgot-password-divider" />
                            <form onSubmit={handleEmailSubmit} className="forgot-password-form">
                                {error && <div className="error-message">{error}</div>}
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                                <button type="submit" disabled={loading}>
                                    {loading ? "Sending..." : "Submit"}
                                </button>
                            </form>
                        </>
                    ) : step === 2 ? (
                        // Step 2: OTP Verification
                        <>
                            <h2 className="form-title">Check Your Email</h2>
                            <hr className="forgot-password-divider" />
                            <form onSubmit={handleOtpSubmit} className="forgot-password-form-step2">
                                {error && <div className="error-message">{error}</div>}
                                <div className="form-group-step2">
                                    <label>Enter OTP</label>
                                    <div className="otp-container">
                                        {otp.map((digit, index) => (
                                            <input
                                                key={index}
                                                type="text"
                                                maxLength="1"
                                                value={digit}
                                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                                ref={(el) => (otpInputs.current[index] = el)}
                                                className="otp-input"
                                                required
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className="resend-text">
                                    Haven't got the email yet?{' '}
                                    <a
                                        href="#"
                                        className={`resend-link ${loading ? 'disabled' : ''}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (!loading) handleResendEmail(e);
                                        }}
                                    >
                                        {loading ? "Sending..." : "Resend email"}
                                    </a>
                                </p>
                                <button type="submit" disabled={loading}>
                                    {loading ? "Verifying..." : "Verify Code"}
                                </button>
                            </form>
                        </>
                    ) : (
                        // Step 3: Password Reset
                        <>
                            <h2 className="form-title">Add New Password</h2>
                            <hr className="forgot-password-divider" />
                            <form onSubmit={handlePasswordSubmit} className="forgot-password-form-step3">
                                {error && <div className="error-message">{error}</div>}
                                <div className="form-group-step3">
                                    <label htmlFor="newPassword">New Password</label>
                                    <div className="forgot-password-input-container">
                                        <input
                                            id="newPassword"
                                            type={showPassword.newPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter new password"
                                            required
                                        />
                                        <span
                                            className="password-toggle"
                                            onClick={() => setShowPassword({
                                                ...showPassword,
                                                newPassword: !showPassword.newPassword
                                            })}
                                        >
                                            {showPassword.newPassword ? <FaEyeSlash /> : <FaEye />}
                                        </span>
                                    </div>
                                </div>
                                <div className="form-group-step3">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <div className="forgot-password-input-container">
                                        <input
                                            id="confirmPassword"
                                            type={showPassword.confirmPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Confirm your password"
                                            required
                                        />
                                        <span
                                            className="password-toggle"
                                            onClick={() => setShowPassword({
                                                ...showPassword,
                                                confirmPassword: !showPassword.confirmPassword
                                            })}
                                        >
                                            {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
                                        </span>
                                    </div>
                                </div>
                                <button type="submit" disabled={loading}>
                                    {loading ? "Updating..." : "Update"}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;