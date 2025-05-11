import React, { useState } from "react";
import "../style/AccountSelectionModal.css";

const AccountSelectionModal = ({ isOpen, onClose }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [primaryGmail, setPrimaryGmail] = useState(""); // Store primary Gmail
  const [primaryPassword, setPrimaryPassword] = useState(""); // Store primary password
  const [recoveryCode, setRecoveryCode] = useState(""); // Store recovery code
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const [errorMessage, setErrorMessage] = useState(""); // Store error messages

  if (!isOpen) return null;

  // ✅ Handle Primary Gmail Input
  const handlePrimaryGmailChange = (e) => {
    setPrimaryGmail(e.target.value);
  };

  // ✅ Handle Primary Password Input
  const handlePrimaryPasswordChange = (e) => {
    setPrimaryPassword(e.target.value);
  };

  // ✅ Handle Recovery Code Input
  const handleRecoveryCodeChange = (e) => {
    setRecoveryCode(e.target.value);
  };

  // ✅ Validate Email Format
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // ✅ Submit Primary Account to Backend
  const handleSubmitPrimary = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message

    // Validate email format
    if (!isValidEmail(primaryGmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true); // Disable button while submitting

    try {
      const response = await fetch("http://localhost:8080/api/user-account/add-primary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: primaryGmail,
          password: primaryPassword,
          recoveryCode: recoveryCode,
        }),
      });

      if (response.ok) {
        console.log("Primary Account Submitted:", { primaryGmail, primaryPassword, recoveryCode });
        setSelectedOption("linked"); // Move to Linked Accounts after entering Gmail
      } else {
        setErrorMessage("Error submitting primary account. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false); // Re-enable button
    }
  };

  return (
    <div className="useraccountselection-modal-overlay" onClick={onClose}>
      <div className="useraccountselection-modal-box" onClick={(e) => e.stopPropagation()}>
        <h2>{selectedOption ? (selectedOption === "primary" ? "Enter Primary Gmail" : "Select Linked Account") : "Select Account Type"}</h2>

        {!selectedOption ? (
          <div className="useraccountselection-btn-row">
            <button onClick={() => setSelectedOption("primary")} className="useraccountselection-btn">
              Primary Account
            </button>
            <span className="useraccountselection-or-text">or</span>
            <button onClick={() => setSelectedOption("linked")} className="useraccountselection-btn">
              Linked Account
            </button>
          </div>
        ) : selectedOption === "primary" ? (
          <form className="useraccountselection-form" onSubmit={handleSubmitPrimary}>
            <input 
              type="email" 
              name="primaryGmail" 
              placeholder="Enter Gmail Address" 
              className="useraccountselection-form-input" 
              value={primaryGmail} 
              onChange={handlePrimaryGmailChange} 
              required 
            />

            <input 
              type="password" 
              name="primaryPassword" 
              placeholder="Enter Password" 
              className="useraccountselection-form-input" 
              value={primaryPassword} 
              onChange={handlePrimaryPasswordChange} 
              required 
            />

            {/* ✅ Recovery Code Field */}
            <div className="useraccountselection-recovery-container">
              <input 
                type="text" 
                name="recoveryCode" 
                placeholder="Enter Recovery Code" 
                className="useraccountselection-recovery-input" 
                value={recoveryCode} 
                onChange={handleRecoveryCodeChange} 
                required 
              />
            </div>

            {/* ✅ Display Error Message */}
            {errorMessage && <p className="useraccountselection-error">{errorMessage}</p>}

            <button type="submit" className="useraccountselection-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Next"}
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
};

export default AccountSelectionModal;
