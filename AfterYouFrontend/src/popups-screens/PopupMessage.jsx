import React, { useEffect } from "react";
import "../style/PopupMessage.css"; // ✅ Import popup styles
import { FaCheckCircle, FaExclamationCircle, FaTimes } from "react-icons/fa"; // ✅ Import icons

const PopupMessage = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // ✅ Auto-close after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`popup-message ${type}`}>
      <div className="popup-icon">
        {type === "success" ? <FaCheckCircle /> : <FaExclamationCircle />}
      </div>
      <p className="popup-text">{message}</p>
      <button className="popup-close-btn" onClick={onClose}>
        <FaTimes />
      </button>
    </div>
  );
};

export default PopupMessage;
