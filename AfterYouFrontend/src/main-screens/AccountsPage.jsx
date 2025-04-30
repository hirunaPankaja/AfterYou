import React from 'react';
import '../style/AccountsPage.css';
import AccountCard from '../componenets/AccountCard'; // Make sure the path is correct

// ✅ Define 3 dummy account objects
const defaultAccounts = [
  {
    id: 1,
    name: "Hiruna Pankaja",
    action: "Transfer",
    platform: "Facebook"
  },
  {
    id: 2,
    name: "Nimal Perera",
    action: "Delete",
    platform: "Instagram"
  },
  {
    id: 3,
    name: "Sunil Silva",
    action: "Memorialize",
    platform: "Gmail"
  }
];

const AccountsPage = () => {
  return (
    <div className="page-container">
      <main className="main-content">
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
            <div className="divider"></div>

            {/* ✅ Map and render 3 account cards */}
            {defaultAccounts.map(account => (
              <AccountCard 
                key={account.id} 
                accountCard={account} 
                platform={account.platform} 
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountsPage;
