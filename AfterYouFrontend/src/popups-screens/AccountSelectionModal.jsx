import React, { useState } from "react";
import "../style/AccountSelectionModal.css";

const AccountSelectionModal = ({ isOpen, onClose }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [primaryGmail, setPrimaryGmail] = useState(""); // Store primary Gmail
  const [primaryPassword, setPrimaryPassword] = useState(""); // Store primary password
  const [recoveryCode, setRecoveryCode] = useState(""); // Store recovery code
  const [selectedGmail, setSelectedGmail] = useState(""); // Store selected Gmail for linked accounts
  const [linkedAccount, setLinkedAccount] = useState(""); // Store selected linked account
  const [userData, setUserData] = useState({
    username: "",
    profileURL: "",
    password: "",
    actionType: "",
  });

  const linkedAccounts = ["Facebook", "Twitter", "LinkedIn", "GitHub"];
  const savedGmails = primaryGmail ? [primaryGmail] : []; // Store previously entered Gmail

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

  // ✅ Submit Primary Account to Backend
  const handleSubmitPrimary = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/user-account/add-primary", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          email: primaryGmail,
          password: primaryPassword,
          recoveryCode: recoveryCode,
        }),
      });

      if (response.ok) {
        console.log("Primary Account Submitted:", { primaryGmail, primaryPassword, recoveryCode });
        setSelectedOption("linked"); // Move to Linked Accounts after entering Gmail
      } else {
        console.error("Error submitting primary account");
      }
    } catch (error) {
      console.error("Network error:", error);
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

            {/* ✅ Recovery Code Field & Info Button */}
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

              {/* ✅ Circular Information Button */}
              <button 
                type="button" 
                className="useraccountselection-info-btn" 
                onClick={() => window.open("https://support.google.com/accounts/answer/1187538?hl=en&co=GENIE.Platform%3DDesktop", "_blank")}
              >
                ℹ️
              </button>
            </div>

            <button type="submit" className="useraccountselection-submit-btn">Next</button>
          </form>
        ) : null}
      </div>
    </div>
  );
};

export default AccountSelectionModal;
