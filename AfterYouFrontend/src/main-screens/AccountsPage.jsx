import React, { useState, useEffect } from 'react';
import '../style/AccountsPage.css';
import AccountCard from '../components/AccountCard'; // Ensure correct path
import { getPrimaryAccounts, getLinkedAccounts } from '../Services/userAccountService'; // ✅ Import API functions

const AccountsPage = () => {
  const [primaryAccounts, setPrimaryAccounts] = useState([]);
  const [selectedPrimaryId, setSelectedPrimaryId] = useState(""); // ✅ Store selected primary account
  const [linkedAccounts, setLinkedAccounts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchPrimaryAccounts();
  }, []);

  // ✅ Fetch all primary accounts for the user
  const fetchPrimaryAccounts = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        console.error("User authentication error. Please log in.");
        setErrorMessage("User authentication error. Please log in.");
        return;
      }

      console.log("Fetching primary accounts for userId:", userId); // ✅ Debugging log

      const primaryAccounts = await getPrimaryAccounts();
      console.log("Primary accounts fetched successfully:", primaryAccounts); // ✅ Debugging log

      setPrimaryAccounts(primaryAccounts);

      // ✅ Set default selected primary account if available
      if (primaryAccounts.length > 0) {
        setSelectedPrimaryId(primaryAccounts[0].primaryId);
        fetchLinkedAccounts(primaryAccounts[0].primaryId);
      }
    } catch (error) {
      console.error("Error fetching primary accounts:", error.response ? error.response.data : error.message);
      setErrorMessage("Error fetching primary accounts.");
    }
  };

  // ✅ Fetch linked accounts for the selected primary account
  const fetchLinkedAccounts = async (primaryId) => {
    try {
      console.log("Fetching linked accounts for primaryId:", primaryId); // ✅ Debugging log

      const linkedAccounts = await getLinkedAccounts(primaryId);
      console.log(`Linked accounts for primaryId ${primaryId}:`, linkedAccounts); // ✅ Debugging log

      setLinkedAccounts(linkedAccounts);
    } catch (error) {
      console.error(`Error fetching linked accounts for primaryId ${primaryId}:`, error.response ? error.response.data : error.message);
    }
  };

  // ✅ Handle primary account selection change
  const handlePrimaryAccountChange = (e) => {
    const newPrimaryId = e.target.value;
    setSelectedPrimaryId(newPrimaryId);
    fetchLinkedAccounts(newPrimaryId);
  };

  return (
    <div className="content-wrapper">
      <div className="left-section">
        <img 
          src="https://dashboard.codeparrot.ai/api/image/Z-o7rXn5m-GBkPHN/istockph.png" 
          alt="Social Media" 
          className="social-media-image" 
        />
      </div>
      <div className="right-section">
        <h2 className="section-title">User Accounts</h2>
        <div className="account-page-divider"></div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* ✅ Dropdown to select primary account */}
        {primaryAccounts.length > 0 ? (
          <div className="primary-account-dropdown">
            <label htmlFor="primaryAccountSelect">Select Primary Account:</label>
            <select 
              id="primaryAccountSelect" 
              className="useraccountselection-form-input" 
              value={selectedPrimaryId} 
              onChange={handlePrimaryAccountChange}
            >
              {primaryAccounts.map(account => (
                <option key={account.primaryId} value={account.primaryId}>
                  {account.email}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <p className="no-accounts-message">No primary accounts found.</p>
        )}

        {/* ✅ Display linked accounts for the selected primary account */}
        <div className="account-cards-grid">
          {linkedAccounts.length > 0 ? (
            linkedAccounts.map(linkedAccount => (
              <AccountCard 
                key={linkedAccount.linkedId} 
                accountCard={linkedAccount} 
              />
            ))
          ) : (
            <p className="no-accounts-message">No linked accounts found for this primary account.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountsPage;
