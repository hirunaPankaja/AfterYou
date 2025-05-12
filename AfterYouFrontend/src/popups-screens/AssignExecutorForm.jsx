import React, { useState } from "react";
import "../style/AssignExecutorForm.css";
import { assignExecutor, sendExecutorVerification } from "../services/executorService";

const AssignExecutorForm = () => {
    const [executorName, setExecutorName] = useState("");
    const [executorEmail, setExecutorEmail] = useState("");
    const [executorNIC, setExecutorNIC] = useState("");
    const [executorRelationship, setExecutorRelationship] = useState("");
    const [sendVerification, setSendVerification] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({
        executorName: false,
        executorEmail: false,
        executorNIC: false,
        executorRelationship: false
    });

    const validateFields = () => {
        const errors = {
            executorName: !executorName.trim(),
            executorEmail: !executorEmail.trim(),
            executorNIC: !executorNIC.trim(),
            executorRelationship: !executorRelationship.trim()
        };

        setFieldErrors(errors);
        return !Object.values(errors).some(error => error);
    };

    const handleSubmit = async () => {
        setError(null);

        // Validate fields before submission
        if (!validateFields()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const userId = localStorage.getItem("userId");
            const executorData = {
                executorName,
                executorEmail,
                executorNicNumber: executorNIC,
                executorRelationship
            };

            const response = await assignExecutor(executorData, userId);

            if (sendVerification) {
                await sendExecutorVerification(response.data.executorId);
            }

            setSuccess(true);
            // Reset form
            setExecutorName("");
            setExecutorEmail("");
            setExecutorNIC("");
            setExecutorRelationship("");
            setSendVerification(false);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to assign executor");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="assign-modal-content">
            <div className="assign-executorform-container">
                <h1 className="assign-executorform-title">Assign Executor</h1>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">Executor assigned successfully!</div>}

                <div className="divider" />
                <div className="assign-executorform-content">
                    <label className="assign-executorform-lable">Executor Name</label>
                    <input
                        type="text"
                        value={executorName}
                        onChange={(e) => setExecutorName(e.target.value)}
                        className={`assign-executorform-input ${fieldErrors.executorName ? "error-field" : ""}`}
                    />
                    {fieldErrors.executorName && <span className="error-text">Executor name is required</span>}
                </div>

                <div className="assign-executorform-content">
                    <label className="assign-executorform-lable">Executor Email</label>
                    <input
                        type="email"
                        value={executorEmail}
                        onChange={(e) => setExecutorEmail(e.target.value)}
                        className={`assign-executorform-input ${fieldErrors.executorEmail ? "error-field" : ""}`}
                    />
                    {fieldErrors.executorEmail && <span className="error-text">Executor email is required</span>}
                </div>

                <div className="assign-executorform-content">
                    <label className="assign-executorform-lable">Executor NIC</label>
                    <input
                        type="text"
                        value={executorNIC}
                        onChange={(e) => setExecutorNIC(e.target.value)}
                        className={`assign-executorform-input ${fieldErrors.executorNIC ? "error-field" : ""}`}
                    />
                    {fieldErrors.executorNIC && <span className="error-text">Executor NIC is required</span>}
                </div>

                <div className="assign-executorform-content">
                    <label className="assign-executorform-lable">Relationship</label>
                    <input
                        type="text"
                        value={executorRelationship}
                        onChange={(e) => setExecutorRelationship(e.target.value)}
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