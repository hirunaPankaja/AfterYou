import React, { useState, useEffect } from "react";
import "../style/AccountSelectionModal.css";
import { addPrimaryAccount, addLinkedAccount, getPrimaryAccounts } from "../Services/userAccountService";

const AccountSelectionModal = ({ isOpen, onClose }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [primaryGmail, setPrimaryGmail] = useState("");
  const [primaryPassword, setPrimaryPassword] = useState("");
  const [recoveryCode, setRecoveryCode] = useState("");
  const [linkedPlatform, setLinkedPlatform] = useState("Facebook");
  const [linkedUsername, setLinkedUsername] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [actionType, setActionType] = useState("TRANSFER");
  const [selectedPrimaryId, setSelectedPrimaryId] = useState("");
  const [primaryAccounts, setPrimaryAccounts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (selectedOption === "linked") {
      fetchPrimaryAccounts();
    }
  }, [selectedOption]);

  const fetchPrimaryAccounts = async () => {
    try {
      const response = await getPrimaryAccounts();
      console.log("Fetched primary accounts:", response);
      setPrimaryAccounts(response);
    } catch (error) {
      console.error("Error fetching primary accounts:", error);
      setErrorMessage(error.response?.data || "Network error while fetching primary accounts.");
    }
  };

  const handlePrimaryGmailChange = (e) => setPrimaryGmail(e.target.value);
  const handlePrimaryPasswordChange = (e) => setPrimaryPassword(e.target.value);
  const handleRecoveryCodeChange = (e) => setRecoveryCode(e.target.value);
  const handleLinkedPlatformChange = (e) => setLinkedPlatform(e.target.value);
  const handleLinkedUsernameChange = (e) => setLinkedUsername(e.target.value);
  const handleProfileUrlChange = (e) => setProfileUrl(e.target.value);
  const handleActionTypeChange = (e) => setActionType(e.target.value);
  const handlePrimaryAccountChange = (e) => setSelectedPrimaryId(e.target.value);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // ✅ Handle Primary Account Submission
  const handleSubmitPrimary = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

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
        userId: localStorage.getItem("userId"),
      });

      console.log("Primary Account Submitted:", response);
      

      // ✅ Navigate to Linked Account Form
      setTimeout(() => {
        setSelectedOption("linked");
      }, 100);
    } catch (error) {
      console.error("Error submitting primary account:", error);
      setErrorMessage(error.response?.data || "Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Handle Linked Account Submission
  const handleSubmitLinked = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!selectedPrimaryId) {
      setErrorMessage("Please select a primary account.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await addLinkedAccount({
        primaryAccount: { primaryId: selectedPrimaryId },
        platform: linkedPlatform,
        username: linkedUsername,
        profileUrl: profileUrl,
        actionType: actionType,
      });

      console.log("Linked Account Submitted:", response);
      setSuccessMessage("Linked account added successfully!");
      onClose();
    } catch (error) {
      console.error("Error submitting linked account:", error);
      setErrorMessage(error.response?.data || "Network error. Please check your connection.");
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
            <input type="email" placeholder="Enter Gmail Address" value={primaryGmail} onChange={handlePrimaryGmailChange} required />
            <input type="password" placeholder="Enter Password" value={primaryPassword} onChange={handlePrimaryPasswordChange} required />
            <input type="text" placeholder="Enter Recovery Code" value={recoveryCode} onChange={handleRecoveryCodeChange} required />

            {errorMessage && <p className="useraccountselection-error">{errorMessage}</p>}
            {successMessage && <p className="useraccountselection-success">{successMessage}</p>}

            <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Next"}</button>
          </form>
        ) : selectedOption === "linked" ? (
          <form className="useraccountselection-form" onSubmit={handleSubmitLinked}>
            <select className="useraccountselection-form-input" value={selectedPrimaryId} onChange={handlePrimaryAccountChange} required>
              <option value="">Select Primary Account</option>
              {primaryAccounts.map((account) => (
                <option key={account.primaryId} value={account.primaryId}>
                  {account.email}
                </option>
              ))}
            </select>

            <select className="useraccountselection-form-input" value={linkedPlatform} onChange={handleLinkedPlatformChange} required>
              <option value="Facebook">Facebook</option>
              <option value="Twitter">Twitter</option>
              <option value="Instagram">Instagram</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Discode">Discode</option>
              <option value="Github">Github</option>
            </select>

            <input type="text" placeholder="Enter Username" value={linkedUsername} onChange={handleLinkedUsernameChange} required />
            <input type="url" placeholder="Enter Profile URL" value={profileUrl} onChange={handleProfileUrlChange} required />

            <select className="useraccountselection-form-input" value={actionType} onChange={handleActionTypeChange} required>
              <option value="TRANSFER">Transfer</option>
              <option value="DELETE">Delete</option>
            </select>

            {errorMessage && <p className="useraccountselection-error">{errorMessage}</p>}
            {successMessage && <p className="useraccountselection-success">{successMessage}</p>}

            <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit"}</button>
          </form>
        ) : null}
      </div>
    </div>
  );
};

export default AccountSelectionModal;
