import React from 'react';
import '../style/SubscriptionDashboard.css';

const SubscriptionDashboard = () => {
  return (
    <div className="dashboard-container">
    
      <main className="main-content">
        <div className="subscription-section">
          <div className="subscription-image">
            <img 
              src="https://dashboard.codeparrot.ai/api/image/Z-qc3Qz4-w8v6RuL/manage-y.png" 
              alt="Subscription Management" 
              className="management-image"
            />
          </div>
          
          <div className="subscription-list">
            <h2 className="subscription-title">Subscriptions</h2>
            <div className="divider"></div>
            
            <div className="subscription-card">
              <img 
                src="https://dashboard.codeparrot.ai/api/image/Z-qc3Qz4-w8v6RuL/icons-8-n.png" 
                alt="Netflix" 
                className="service-icon"
              />
              <span className="profile-text">Profile  |  Shey Silva</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubscriptionDashboard;

