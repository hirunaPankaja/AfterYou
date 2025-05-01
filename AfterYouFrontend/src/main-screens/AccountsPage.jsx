import React from 'react';
import '../style/AccountsPage.css';
import AccountCard from '../components/AccountCard'; // Make sure this path is correct

// Dummy data
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
    name: "Nimal Perera",
    action: "Delete",
    platform: "Netflix"
  },
  {
    id: 4,
    name: "Nimal Perera",
    action: "Delete",
    platform: "Discode"
  },
  {
    id: 5,
    name: "Nimal Perera",
    action: "Delete",
    platform: "Twitter"
  },
  {
    id: 6,
    name: "Nimal Perera",
    action: "Delete",
    platform: "Telegram"
  },
  {
    id: 7,
    name: "Nimal Perera",
    action: "Delete",
    platform: "Whatsapp"
  },
  {
    id: 8,
    name: "Sunil Silva",
    action: "Memorialize",
    platform: "Gmail"
  }
];

const AccountsPage = () => {
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
            <div className="divider"></div>

            {/* Account cards displayed in two-column layout */}
            <div className="account-cards-grid">
              {defaultAccounts.map(account => (
                <AccountCard 
                  key={account.id} 
                  accountCard={account} 
                  platform={account.platform} 
                />
              ))}
            </div>
          </div>
        </div>
      
    
  );
};

export default AccountsPage;
