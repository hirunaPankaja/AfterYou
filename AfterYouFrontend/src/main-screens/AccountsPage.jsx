import React from 'react';
import '../style/AccountsPage.css';
import AccountCard from '../componenets/AccountCard'; // 👈 Import the component

const AccountsPage = () => {
  const defaultAccounts = [
    {
      id: 1,
      platform: 'facebook',
      icon: 'https://dashboard.codeparrot.ai/api/image/Z-o7rXn5m-GBkPHN/icons-8-f.png',
      profile: 'Shey Silva',
      action: 'Delete'
    },
    { 
      id: 20, 
      platform: 'google',
      icon: 'https://dashboard.codeparrot.ai/api/image/Z-o7rXn5m-GBkPHN/icons-8-g.png',
      profile: 'Shey Silva',
      action: 'Transfer',
      receiver: 'Dilshan'
    }
  ];

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

            {defaultAccounts.map(account => (
              <AccountCard key={account.id} account={account} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountsPage;
