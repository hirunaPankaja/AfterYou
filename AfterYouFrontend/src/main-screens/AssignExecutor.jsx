import React, { useState } from "react";
import "../style/AssignExecutor.css";
import Header from "../components/Header.jsx";
import AssignLawyer from "../popups-screens/AssignLawyer.jsx";

const AssignExecutor = ({
                            title = "Assign Executor",
                            warningText = "Transferring your digital accounts to someone else after you is a legal process. Therefore, please note that you can only enter the recipient's information after informing your lawyer first.",
                        }) => {
    const [modalType, setModalType] = useState(null); // null, "lawyer", "executor"


    const handleOpenModal = (type) => {
        setModalType(type);
        document.body.style.overflow = "hidden";
    };

    const handleCloseModal = () => {
        setModalType(null);
        document.body.style.overflow = "auto";
    };

    const ModalContent = () => {
        if (!modalType) return null;

        return (
            <div className="modal-overlay" onClick={handleCloseModal}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <button className="close" onClick={handleCloseModal}>
                        X
                    </button>

                    {/* You can later use conditional rendering here if you want to show different UIs */}
                    <AssignLawyer />
                </div>
            </div>
        );
    };

    return (
        <div>
            <Header />

            <div className="assign-executor-container">
                <h1 className="title">{title}</h1>
                <div className="divider"></div>
                <p className="warning-text">{warningText}</p>

                <div className="options-container">
                    <div
                        className="option-card"
                        onClick={() => handleOpenModal("lawyer")}
                    >
                        <div className="assign-action-button">
                            <img
                                src="https://dashboard.codeparrot.ai/api/image/Z-o_IAz4-w8v6Rqr/icons-8-l.png"
                                alt="Lawyer icon"
                                className="option-icon"
                            />
                        </div>
                        <span className="option-text">Add Lawyer</span>
                    </div>

                    <div
                        className="option-card"
                        onClick={() => handleOpenModal("executor")}
                    >
                        <div className="assign-action-button">
                            <img
                                src="https://dashboard.codeparrot.ai/api/image/Z-o_IAz4-w8v6Rqr/icons-8-m.png"
                                alt="Executor icon"
                                className="option-icon"
                            />
                        </div>
                        <span className="option-text">Add Executor</span>
                    </div>
                </div>
            </div>

            {/* Render modal if needed */}
            <ModalContent />
        </div>
    );
};

export default AssignExecutor;
