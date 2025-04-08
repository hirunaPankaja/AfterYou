import React from 'react';
import '../style/ProfilePage.css';
import useNavigation from '../hooks/useNavigate';
const ProfilePage = ({ userName = "Shey Silva" }) => {
  const { goToHome,goToAccounts,goToExecutors,goToUser,goToSubscription } = useNavigation();
  return (
    <div className="profile-page">
      

      <main className="profile-main-content">
        <h2 className="greeting">Hello {userName}!</h2>
        <h1 className="welcome-text">Welcome to your profile.</h1>
        
        <div className="main-divider"></div>

        <div className="profile-action-buttons">
          <div className="profile-action-item">
            <div className="profile-action-button">
              <img src="https://dashboard.codeparrot.ai/api/image/Z-l04wz4-w8v6RoA/icons-8-a.png" alt="Add" className="action-icon" />
            </div>
            <span className="profile-action-text">Add Account</span>
          </div>

          <div className="profile-action-item">
            <div className="profile-action-button">
              <img src="https://dashboard.codeparrot.ai/api/image/Z-l04wz4-w8v6RoA/icons-8-s.png" alt="Subscribe" className="action-icon" />
            </div>
            <span className="profile-action-text">Add Subscription</span>
          </div>

          <div className="profile-action-item">
            <div className="profile-action-button">
              <img src="https://dashboard.codeparrot.ai/api/image/Z-l04wz4-w8v6RoA/icons-8-b.png" alt="Assign" className="action-icon" />
            </div>
            <span className="profile-action-text">Assign Executor</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;