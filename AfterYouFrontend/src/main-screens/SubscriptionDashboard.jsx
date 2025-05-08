import React from 'react';
import '../style/SubscriptionDashboard.css';
import SubscriptionCard from '../components/SubscriptionsCard'; 

// Dummy data
const defaultAccounts = [
  {
    id: 1,
    name: "Hiruna Pankaja",
    type: "Monthly recurring",
    platform: "Facebook"
  },
  {
    id: 2,
    name: "Nimal Perera",
    type: "yearly recurring",
    platform: "Instagram"
  },
  {
    id: 3,
    name: "Nimal Perera",
    type: "yearly recurring",
    platform: "Netflix"
  },
  {
    id: 4,
    name: "Nimal Perera",
    type: "Monthl y recurring",
    platform: "Discode"
  },
  {
    id: 5,
    name: "Nimal Perera",
    type: "Monthly recurring",
    platform: "Twitter"
  },
  {
    id: 6,
    name: "Nimal Perera",
    type: "Monthly recurring",
    platform: "Telegram"
  },
  {
    id: 7,
    name: "Nimal Perera",
    type: "Monthly recurring",
    platform: "Whatsapp"
  },
  {
    id: 8,
    name: "Sunil Silva",
    type: "Monthly recurring",
    platform: "Gmail"
  }
];

const SubscriptionDashboard = () => {
  return (
    
      
        <div className="content-wrapper">
          <div className="left-section">
            <img 
               src="https://dashboard.codeparrot.ai/api/image/Z-qc3Qz4-w8v6RuL/manage-y.png" 
              alt="Social Media" 
              className="social-media-image" 
            />
          </div>
          <div className="right-section">
            <h2 className="section-title">Subscriptions</h2>

            <div className="subscription-divider"></div>

            {/* Account cards displayed in two-column layout */}
            <div className="account-cards-grid">
            {defaultAccounts.map(account => (
  <SubscriptionCard 
    key={account.id} 
    subscriptionAccountCard={account} // Make sure the prop name matches
    platform={account.platform} 
  />
))}

            </div>
          </div>
        </div>
      
    
  );
};

export default SubscriptionDashboard;
