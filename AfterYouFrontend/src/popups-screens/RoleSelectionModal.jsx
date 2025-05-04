import React from "react";
import "../Style/RoleSelectionModal.css";

const RoleSelectionModal = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2>Select Role</h2>

        <div className="role-btn-row">
          <button onClick={() => onSelect("user")} className="role-btn">User</button>
          <span className="or-text">or</span>
          <button onClick={() => onSelect("executor")} className="role-btn">Executor</button>
        </div>

        <button onClick={onClose} className="close-btn">Cancel</button>
      </div>
    </div>
  );
};

export default RoleSelectionModal;
