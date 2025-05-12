import React, { useState, useEffect } from "react";
import "../style/AccountSelectionModal.css";
import { addPrimaryAccount, addLinkedAccount, getPrimaryAccounts } from "../Services/userAccountService";

const AccountSelectionModal = ({ isOpen, onClose }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [primaryGmail, setPrimaryGmail] = useState("");
  const [primaryPassword, setPrimaryPassword] = useState("");
  const [recoveryCode, setRecoveryCode] = useState("");
  const [linkedPlatform, setLinkedPlatform] = useState("Facebook"); // ✅ Default selection
  const [linkedUsername, setLinkedUsername] = useState("");
  const [profileUrl, setProfileUrl] = useState(""); // ✅ Added profile URL field
  const [actionType, setActionType] = useState("TRANSFER"); // ✅ Default selection
  const [selectedPrimaryId, setSelectedPrimaryId] = useState(""); // ✅ Store selected primary account
  const [primaryAccounts, setPrimaryAccounts] = useState([]); // ✅ Store available primary accounts
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (selectedOption === "linked") {
      fetchPrimaryAccounts();
    }
  }, [selectedOption]);

  const fetchPrimaryAccounts = async () => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      const response = await getPrimaryAccounts(jwtToken);
      if (response.status === 200) {
        setPrimaryAccounts(response.data);
      } else {
        setErrorMessage("Error fetching primary accounts.");
      }
    } catch (error) {
      setErrorMessage("Network error while fetching primary accounts.");
    }
  };

  const handlePrimaryGmailChange = (e) => setPrimaryGmail(e.target.value);
  const handlePrimaryPasswordChange = (e) => setPrimaryPassword(e.target.value);
  const handleRecoveryCodeChange = (e) => setRecoveryCode(e.target.value);
  const handleLinkedPlatformChange = (e) => setLinkedPlatform(e.target.value);
  const handleLinkedUsernameChange = (e) => setLinkedUsername(e.target.value);
  const handleProfileUrlChange = (e) => setProfileUrl(e.target.value); // ✅ Added handler for profile URL
  const handleActionTypeChange = (e) => setActionType(e.target.value); // ✅ Added handler for action type
  const handlePrimaryAccountChange = (e) => setSelectedPrimaryId(e.target.value);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // ✅ Handle Primary Account Submission
  const handleSubmitPrimary = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!isValidEmail(primaryGmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      const userId = localStorage.getItem("userId");

      if (!jwtToken || !userId) {
        setErrorMessage("Authentication error. Please log in again.");
        return;
      }

      const response = await addPrimaryAccount(
        {
          email: primaryGmail,
          password: primaryPassword,
          recoveryCode: recoveryCode,
          userId: userId,
        },
        jwtToken
      );

      if (response.status === 200) {
        console.log("Primary Account Submitted:", response.data);
        setSelectedOption("linked"); // ✅ Switch to Linked Account Form
      } else {
        setErrorMessage("Error submitting primary account. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Handle Linked Account Submission
  const handleSubmitLinked = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!selectedPrimaryId) {
      setErrorMessage("Please select a primary account.");
      return;
    }

    setIsSubmitting(true);
    try {
      const jwtToken = localStorage.getItem("jwtToken");

      const response = await addLinkedAccount(
        {
          primaryAccount: { primaryId: selectedPrimaryId },
          platform: linkedPlatform,
          username: linkedUsername,
          profileUrl: profileUrl, // ✅ Added profile URL field
          actionType: actionType, // ✅ Added action type field
        },
        jwtToken
      );

      if (response.status === 200) {
        console.log("Linked Account Submitted:", response.data);
        onClose(); // ✅ Close modal after successful submission
      } else {
        setErrorMessage("Error submitting linked account. Please try again.");
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
              : "Enter Linked Account Details"
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

    
       <button
        type="button"
        className="useraccountselection-info-btn"
        onClick={() => window.open("https://support.google.com/accounts/answer/185839?hl=en&co=GENIE.Platform%3DAndroid", "_blank")}
           >
           ℹ️ Info
           </button>
          </div>



            {errorMessage && <p className="useraccountselection-error">{errorMessage}</p>}

            <button type="submit" className="useraccountselection-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Next"}
            </button>
          </form>
        ) : selectedOption === "linked" ? (
          <form className="useraccountselection-form" onSubmit={handleSubmitLinked}>
            <select
              name="selectedPrimaryId"
              className="useraccountselection-form-input"
              value={selectedPrimaryId}
              onChange={handlePrimaryAccountChange}
              required
            >
              <option value="">Select Primary Account</option>
              {primaryAccounts.map((account) => (
                <option key={account.primaryId} value={account.primaryId}>
                  {account.email}
                </option>
              ))}
            </select>

            <select
              name="linkedPlatform"
              className="useraccountselection-form-input"
              value={linkedPlatform}
              onChange={handleLinkedPlatformChange}
              required
            >
              <option value="Facebook">Facebook</option>
              <option value="Twitter">Twitter</option>
              <option value="Instagram">Instagram</option>
              <option value="LinkedIn">LinkedIn</option>
            </select>

            <input
              type="text"
              name="linkedUsername"
              placeholder="Enter Username"
              className="useraccountselection-form-input"
              value={linkedUsername}
              onChange={handleLinkedUsernameChange}
              required
            />

            <input
              type="url"
              name="profileUrl"
              placeholder="Enter Profile URL"
              className="useraccountselection-form-input"
              value={profileUrl}
              onChange={handleProfileUrlChange}
              required
            />

            <select
              name="actionType"
              className="useraccountselection-form-input"
              value={actionType}
              onChange={handleActionTypeChange}
              required
            >
              <option value="TRANSFER">Transfer</option>
              <option value="DELETE">Delete</option>
            </select>

            {errorMessage && <p className="useraccountselection-error">{errorMessage}</p>}

            <button type="submit" className="useraccountselection-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
};

export default AccountSelectionModal;
