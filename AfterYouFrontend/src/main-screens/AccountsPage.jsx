import React, { useState, useEffect } from 'react';
import '../style/AccountsPage.css';
import AccountCard from '../components/AccountCard'; // Ensure correct path
import { getLinkedAccounts } from '../Services/userAccountService'; // ✅ Import API function

const AccountsPage = () => {
  const [linkedAccounts, setLinkedAccounts] = useState([]);

  useEffect(() => {
    fetchLinkedAccounts();
  }, []);

 const fetchLinkedAccounts = async () => {
  try {
    const jwtToken = localStorage.getItem("jwtToken");
    const primaryId = localStorage.getItem("primaryId");

    if (!jwtToken || !primaryId) {
      console.error("Primary account not found. Please register first.");
      return;
    }

    console.log("Fetching linked accounts for primaryId:", primaryId); // ✅ Debugging log

    const linkedAccounts = await getLinkedAccounts(primaryId);
    console.log("Linked accounts fetched successfully:", linkedAccounts); // ✅ Debugging log

    setLinkedAccounts(linkedAccounts);
  } catch (error) {
    console.error("Error fetching linked accounts:", error.response ? error.response.data : error.message);
  }
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
        <h2 className="section-title">Accounts</h2>
        <div className="account-page-divider"></div>

        {/* ✅ Pass linked accounts to AccountCard */}
        <div className="account-cards-grid">
          {linkedAccounts.length > 0 ? (
            linkedAccounts.map(account => (
              <AccountCard 
                key={account.linkedId} // ✅ Fix key to match database column
                accountCard={account} 
              />
            ))
          ) : (
            <p className="no-accounts-message">No linked accounts found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountsPage;
