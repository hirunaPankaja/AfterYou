import React, { useState } from "react";
import  "../style/AssignExecutorForm.css";

const AssignExecutorForm = () => {
    const [executorName, setExecutorName] = useState("");
    const [executorEmail, setExecutorEmail] = useState("");
    const [executorNIC, setExecutorNIC] = useState("");
    const [executorRelationship, setExecutorRelationship] = useState("");

    const handleSubmit = () => {
        // Replace with real form submission logic
        console.log("Submitted:", {
            executorName,
            executorEmail,
            executorNIC,
            executorRelationship,
        });
    };

    return (
        <div className="assign-modal-content">

            <div className="assign-executorform-container">
                <h1 className="assign-executorform-title">Assign Executor</h1>

                <div className="divider" />
                <div className="assign-executorform-content">
                    <label className="assign-executorform-lable">Executor Name</label>
                    <input
                        type="text"
                        value={executorName}
                        onChange={(e) => setExecutorName(e.target.value)}
                        className="assign-executorform-input"
                    />
                </div>

                <div className="assign-executorform-content">
                    <label className="assign-executorform-lable">Executor Email</label>
                    <input
                        type="email"
                        value={executorEmail}
                        onChange={(e) => setExecutorEmail(e.target.value)}
                        className="assign-executorform-input"
                    />
                </div>

                <div className="assign-executorform-content">
                    <label className="assign-executorform-lable">Executor NIC</label>
                    <input
                        type="text"
                        value={executorNIC}
                        onChange={(e) => setExecutorNIC(e.target.value)}
                        className="assign-executorform-input"
                    />
                </div>

                <div className="assign-executorform-content">
                    <label className="assign-executorform-lable">Relationship</label>
                    <input
                        type="text"
                        value={executorRelationship}
                        onChange={(e) => setExecutorRelationship(e.target.value)}
                        className="assign-executorform-input"
                    />
                </div>

                <div className="executorform-input">
                    <label className="assign-executorform-lable">Executor Verification</label>
                    <div className="executorform-checkbox">
                        <input className="executorform-checkbox-input" type="checkbox"/>  Send Verification Email to Executor
                    </div>
                </div>

                <button className="assign-executorform-submit-button" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default AssignExecutorForm;
