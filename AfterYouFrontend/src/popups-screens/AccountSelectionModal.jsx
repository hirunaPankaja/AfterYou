import React, { useState } from "react";
import "../style/AccountSelectionModal.css";
import { addPrimaryAccount } from "../Services/userAccountService";

const AccountSelectionModal = ({ isOpen, onClose }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [primaryGmail, setPrimaryGmail] = useState("");
  const [primaryPassword, setPrimaryPassword] = useState("");
  const [recoveryCode, setRecoveryCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handlePrimaryGmailChange = (e) => setPrimaryGmail(e.target.value);
  const handlePrimaryPasswordChange = (e) => setPrimaryPassword(e.target.value);
  const handleRecoveryCodeChange = (e) => setRecoveryCode(e.target.value);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmitPrimary = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!isValidEmail(primaryGmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await addPrimaryAccount({
        email: primaryGmail,
        password: primaryPassword,
        recoveryCode: recoveryCode,
      });

      if (response.status === 200) {
        console.log("Primary Account Submitted:", response.data);
        setSelectedOption("linked");
      } else {
        setErrorMessage("Error submitting primary account. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="useraccountselection-modal-overlay" onClick={onClose}>
      <div className="useraccountselection-modal-box" onClick={(e) => e.stopPropagation()}>
        <h2>
          {selectedOption
            ? selectedOption === "primary"
              ? "Enter Primary Gmail"
              : "Select Linked Account"
            : "Select Account Type"}
        </h2>

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
