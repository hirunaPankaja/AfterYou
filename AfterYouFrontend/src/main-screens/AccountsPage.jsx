import React from 'react';
import '../style/AccountsPage.css';

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
      id: 2, 
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
              <div key={account.id} className="account-card">
                <img src={account.icon} alt={account.platform} className="platform-icon" />
                <div className="account-details">
                  <p className="detail-row">Profile |: {account.profile}</p>
                  <p className="detail-row">Action |: {account.action}</p>
                  {account.receiver && (
                    <p className="detail-row">Reciver |: {account.receiver}</p>
                  )}
                </div>
                <div className="action-buttons">
                  <button className="action-btn delete">
                    <img 
                      src="https://dashboard.codeparrot.ai/api/image/Z-o7rXn5m-GBkPHN/icons-8-d-2.png" 
                      alt="Delete" 
                    />
                  </button>
                  <button className="action-btn update">
                    <img 
                      src="https://dashboard.codeparrot.ai/api/image/Z-o7rXn5m-GBkPHN/icons-8-u-2.png" 
                      alt="Update" 
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountsPage;

