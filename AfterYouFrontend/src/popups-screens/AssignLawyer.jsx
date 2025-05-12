import React, { useState } from "react";
import "../style/AssignLawyer.css";
import { assignLawyer } from '../Services/lawyerService';

const AssignLawyer = () => {
    const [lawyerName, setLawyerName] = useState("");
    const [lawyerEmail, setLawyerEmail] = useState("");
    const [lawyerContact, setLawyerContact] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({
        lawyerName: false,
        lawyerEmail: false,
        lawyerContact: false
    });

    const validateFields = () => {
        const errors = {
            lawyerName: !lawyerName.trim(),
            lawyerEmail: !lawyerEmail.trim(),
            lawyerContact: !lawyerContact.trim()
        };

        setFieldErrors(errors);
        return !Object.values(errors).some(error => error);
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = async () => {
        setError(null);
        setSuccess(false);

        // Validate fields before submission
        if (!validateFields()) {
            return;
        }

        // Additional email validation
        if (!validateEmail(lawyerEmail)) {
            setFieldErrors(prev => ({...prev, lawyerEmail: true}));
            setError("Please enter a valid email address");
            return;
        }

        setIsSubmitting(true);

        try {
            // Get userId from auth context or localStorage
            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem("jwtToken");

            if (!token) {
                throw new Error("Authentication token not found");
            }

            const response = await assignLawyer(
                {
                    lawyerName,
                    lawyerEmail,
                    lawyerContact,
                },
                userId,
            ).then(res => res.data);

            setSuccess(true);
            console.log("Lawyer assigned successfully:", response);

            // Reset form on success
            setLawyerName("");
            setLawyerEmail("");
            setLawyerContact("");
            setFieldErrors({
                lawyerName: false,
                lawyerEmail: false,
                lawyerContact: false
            });
        }
        catch(err) {
            setError(err.response?.data?.message || "Failed to assign lawyer");
            console.error("Error assigning lawyer:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="assign-modal-content">
            <div className="assign-lawyer-container">
                <h1 className="assign-lawyer-title">Assign Lawyer</h1>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="assign-lawyer-success-message">Lawyer assigned successfully!</div>}

                <div className="divider" />
                <div className="assign-lawyer-content">
                    <label className="assign-lawyer-lable">Lawyer Name</label>
                    <input
                        type="text"
                        value={lawyerName}
                        onChange={(e) => setLawyerName(e.target.value)}
                        className={`assign-lawyer-input ${fieldErrors.lawyerName ? "error-field" : ""}`}
                    />
                    {fieldErrors.lawyerName && <span className="error-text">Lawyer name is required</span>}
                </div>

                <div className="assign-lawyer-content">
                    <label className="assign-lawyer-lable">Lawyer Email</label>
                    <input
                        type="email"
                        value={lawyerEmail}
                        onChange={(e) => setLawyerEmail(e.target.value)}
                        className={`assign-lawyer-input ${fieldErrors.lawyerEmail ? "error-field" : ""}`}
                    />
                    {fieldErrors.lawyerEmail && <span className="error-text">Valid email is required</span>}
                </div>

                <div className="assign-lawyer-content">
                    <label className="assign-lawyer-lable">Lawyer Contact</label>
                    <input
                        type="text"
                        value={lawyerContact}
                        onChange={(e) => setLawyerContact(e.target.value)}
                        className={`assign-lawyer-input ${fieldErrors.lawyerContact ? "error-field" : ""}`}
                    />
                    {fieldErrors.lawyerContact && <span className="error-text">Contact number is required</span>}
                </div>

                <button
                    className="assign-lawyer-submit-button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </div>
        </div>
    );
};

export default AssignLawyer;