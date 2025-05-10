import React, { useState } from "react";
import "../style/AccountSelectionModal.css";

const AccountSelectionModal = ({ isOpen, onClose }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [primaryGmail, setPrimaryGmail] = useState(""); // Store primary Gmail
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

  const handlePrimaryGmailChange = (e) => {
    setPrimaryGmail(e.target.value);
  };

  const handleLinkedAccountChange = (e) => {
    setLinkedAccount(e.target.value);
  };

  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmitPrimary = (e) => {
    e.preventDefault();
    setSelectedOption("linked"); // Move to Linked Accounts after entering Gmail
  };

  const handleSubmitLinked = (e) => {
    e.preventDefault();
    console.log("Linked Account Selected:", { selectedGmail, linkedAccount, userData });
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
            <button type="submit" className="useraccountselection-submit-btn">Next</button>
          </form>
        ) : selectedOption === "linked" ? (
          <form className="useraccountselection-form" onSubmit={handleSubmitLinked}>
            <label>Choose your Gmail:</label>
            <select 
              name="selectedGmail" 
              className="useraccountselection-form-input" 
              value={selectedGmail} 
              onChange={(e) => setSelectedGmail(e.target.value)}
              required
            >
              <option value="">-- Select --</option>
              {savedGmails.map((gmail) => (
                <option key={gmail} value={gmail}>{gmail}</option>
              ))}
            </select>

            <label>Select Linked Account:</label>
            <select 
              name="linkedAccount" 
              className="useraccountselection-form-input" 
              value={linkedAccount} 
              onChange={handleLinkedAccountChange} 
              required
            >
              <option value="">-- Select --</option>
              {linkedAccounts.map((account) => (
                <option key={account} value={account}>{account}</option>
              ))}
            </select>

            {linkedAccount && (
              <div className="useraccountselection-account-details">
               <div className="useraccountselection-account-details-accname"> <h5>Enter Account Details for {linkedAccount}</h5></div>
              

                <input 
                  type="text" 
                  name="username" 
                  placeholder="Username" 
                  className="useraccountselection-form-input" 
                  value={userData.username} 
                  onChange={handleUserDataChange} 
                  required 
                />

                <input 
                  type="url" 
                  name="profileURL" 
                  placeholder="Profile URL" 
                  className="useraccountselection-form-input useraccountselection-profile-url" 
                  value={userData.profileURL} 
                  onChange={handleUserDataChange} 
                  required 
                  autoComplete="off"
                />

                <input 
                  type="password" 
                  name="password" 
                  placeholder="Password" 
                  className="useraccountselection-form-input" 
                  value={userData.password} 
                  onChange={handleUserDataChange} 
                  required 
                />

                <label>Action Type:</label>
                <select 
                  name="actionType" 
                  className="useraccountselection-form-input" 
                  value={userData.actionType} 
                  onChange={handleUserDataChange} 
                  required
                >
                  <option value="">-- Select --</option>
                  <option value="delete">Delete Account</option>
                  <option value="transfer">Transfer Account</option>
                </select>
              </div>
            )}

            <button type="submit" className="useraccountselection-submit-btn">Submit</button>
          </form>
        ) : null}

        <button onClick={onClose} className="useraccountselection-close-btn">Cancel</button>
      </div>
    </div>
  );
};

export default AccountSelectionModal;
