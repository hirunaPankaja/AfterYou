import React, { useState, useRef } from "react";
import "../style/ForgotPassword.css";
import logo from "../assets/logo.png";

const ForgotPassword = ({ onClose }) => {
    const [email, setEmail] = useState("");
    const [step, setStep] = useState(1);
    const [otp, setOtp] = useState(["", "", "", "", ""]);
    const otpInputs = useRef([]);

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted email:", email);
        setStep(2);
    };

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

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        const fullOtp = otp.join('');
        console.log("Submitted OTP:", fullOtp);
        onClose();
    };

    const handleResendEmail = (e) => {
        e.preventDefault();
        setStep(1);
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
                    {step === 1 ? (
                        <>
                            <h2 className="form-title">Forgot Password</h2>
                            <hr className="divider" />
                            <form onSubmit={handleEmailSubmit} className="forgot-password-form">
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
                                <button type="submit">Submit</button>
                            </form>
                        </>
                    ) : (
                        <>
                            <h2 className="form-title">Check Your Email</h2>
                            <hr className="divider" />
                            <form onSubmit={handleOtpSubmit} className="forgot-password-form-step2">
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
                                    <a href="#" className="resend-link" onClick={handleResendEmail}>
                                        Resend email
                                    </a>
                                </p>
                                <button type="submit">Verify Code</button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;