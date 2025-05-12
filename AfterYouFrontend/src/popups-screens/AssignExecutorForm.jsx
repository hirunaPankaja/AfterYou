import React, { useState } from "react";
import "../style/AssignExecutorForm.css";
import { assignExecutor, sendExecutorVerification } from "../services/executorService";

const AssignExecutorForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        executorName: "",
        executorEmail: "",
        executorNicNumber: "",
        executorRelationship: ""
    });
    const [sendVerification, setSendVerification] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({
        executorName: false,
        executorEmail: false,
        executorNicNumber: false,
        executorRelationship: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateFields = () => {
        const errors = {
            executorName: !formData.executorName.trim(),
            executorEmail: !formData.executorEmail.trim(),
            executorNicNumber: !formData.executorNicNumber.trim(),
            executorRelationship: !formData.executorRelationship.trim()
        };

        setFieldErrors(errors);
        return !Object.values(errors).some(error => error);
    };

    const handleSubmit = async () => {
        setError(null);

        if (!validateFields()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const userId = parseInt(localStorage.getItem("userId"));
            console.log(userId);

            const executorData = {
                executorName: "",
                executorEmail: "",
                executorNicNumber: executorNIC,
                executorRelationship
            };

            // Pass both executorData and userId separately
            const response = await assignExecutor(executorData, userId);

            // Send verification if checkbox is checked
            if (sendVerification) {
                await sendExecutorVerification(response.data.executorId);
            }

            setSuccess(true);
            setTimeout(() => onClose(), 2000);

        } catch (err) {
            setError(err.response?.data?.message || "Failed to assign executor");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="assign-modal-content">
                <div className="assign-executorform-container">
                    <div className="success-message">
                        Executor assigned successfully!
                        {sendVerification && <p>Verification email has been sent.</p>}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="assign-modal-content">
            <div className="assign-executorform-container">
                <h1 className="assign-executorform-title">Assign Executor</h1>

                {error && <div className="error-message">{error}</div>}

                <div className="divider" />

                <div className="assign-executorform-content">
                    <label className="assign-executorform-lable">Executor Name</label>
                    <input
                        type="text"
                        name="executorName"
                        value={formData.executorName}
                        onChange={handleChange}
                        className={`assign-executorform-input ${fieldErrors.executorName ? "error-field" : ""}`}
                    />
                    {fieldErrors.executorName && <span className="error-text">Executor name is required</span>}
                </div>

                <div className="assign-executorform-content">
                    <label className="assign-executorform-lable">Executor Email</label>
                    <input
                        type="email"
                        name="executorEmail"
                        value={formData.executorEmail}
                        onChange={handleChange}
                        className={`assign-executorform-input ${fieldErrors.executorEmail ? "error-field" : ""}`}
                    />
                    {fieldErrors.executorEmail && <span className="error-text">Valid email is required</span>}
                </div>

                <div className="assign-executorform-content">
                    <label className="assign-executorform-lable">Executor NIC</label>
                    <input
                        type="text"
                        name="executorNicNumber"
                        value={formData.executorNicNumber}
                        onChange={handleChange}
                        className={`assign-executorform-input ${fieldErrors.executorNicNumber ? "error-field" : ""}`}
                    />
                    {fieldErrors.executorNicNumber && <span className="error-text">NIC number is required</span>}
                </div>

                <div className="assign-executorform-content">
                    <label className="assign-executorform-lable">Relationship</label>
                    <input
                        type="text"
                        name="executorRelationship"
                        value={formData.executorRelationship}
                        onChange={handleChange}
                        className={`assign-executorform-input ${fieldErrors.executorRelationship ? "error-field" : ""}`}
                    />
                    {fieldErrors.executorRelationship && <span className="error-text">Relationship is required</span>}
                </div>

                <div className="executorform-input">
                    <label className="assign-executorform-lable">Executor Verification</label>
                    <div className="executorform-checkbox">
                        <input
                            className="executorform-checkbox-input"
                            type="checkbox"
                            checked={sendVerification}
                            onChange={(e) => setSendVerification(e.target.checked)}
                        />
                        Send Verification Email to Executor
                    </div>
                </div>

                <button
                    className="assign-executorform-submit-button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </div>
        </div>
    );
};

export default AssignExecutorForm;