import React, { useState } from "react";
import "../style/ForgotPassword.css";
import logo from "../assets/logo.png";

const ForgotPassword = ({ onClose }) => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted email:", email);
        onClose(); // Close the popup after submission
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

                <div className="modal-content">
                    <h2 className="form-title">Forgot Password</h2>
                    <hr className="divider" />

                    <form onSubmit={handleSubmit} className="forgot-password-form">
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
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
