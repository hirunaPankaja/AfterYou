import React, { useState } from "react";
import  "../style/AssignLawyer.css";

const AssignLawyer = () => {
    const [lawyerName, setLawyerName] = useState("");
    const [lawyerEmail, setLawyerEmail] = useState("");
    const [lawyerContact, setLawyerContact] = useState("");

    const handleSubmit = () => {
        // Replace with real form submission logic
        console.log("Submitted:", {
            lawyerName,
            lawyerEmail,
            lawyerContact,
        });
    };

    return (
        <div>

            <div className="assign-lawyer-container">
                <h1 className="assign-lawyer-title">Assign Lawyer</h1>

                <div className="assign-lawyer-container">
                    <label className="assign-lawyer-lable">Lawyer Name</label>
                    <input
                        type="text"
                        value={lawyerName}
                        onChange={(e) => setLawyerName(e.target.value)}
                        className="assign-lawyer-input"
                    />
                </div>

                <div className="assign-lawyer-container">
                    <label className="assign-lawyer-lable">Lawyer Email</label>
                    <input
                        type="email"
                        value={lawyerEmail}
                        onChange={(e) => setLawyerEmail(e.target.value)}
                        className="assign-lawyer-input"
                    />
                </div>

                <div className="assign-lawyer-container">
                    <label className="assign-lawyer-lable">Lawyer Contact</label>
                    <input
                        type="text"
                        value={lawyerContact}
                        onChange={(e) => setLawyerContact(e.target.value)}
                        className="assign-lawyer-input"
                    />
                </div>

                <button className="assign-lawyer-submit-button" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default AssignLawyer;
