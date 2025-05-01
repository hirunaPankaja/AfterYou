import React, { useState } from 'react';
import '../style/ProfilePage.css';
import useNavigation from '../hooks/useNavigate';

const ProfilePage = ({ userName = "Shey Silva" }) => {
  const { goToHome, goToAccounts, goToExecutors, goToUser, goToSubscription } = useNavigation();

  const [addAccountTooltipVisible, setAddAccountTooltipVisible] = useState(false);
  const [addSubscriptionTooltipVisible, setAddSubscriptionTooltipVisible] = useState(false);
  const [assignExecutorTooltipVisible, setAssignExecutorTooltipVisible] = useState(false);

  const handleAssignExecutorClick = () => {
    goToExecutors(); // Navigate to the Executors page
  };

  // Handle mouse enter and leave events to show/hide tooltips
  const handleMouseEnter = (button) => {
    switch (button) {
      case 'addAccount':
        setAddAccountTooltipVisible(true);
        break;
      case 'addSubscription':
        setAddSubscriptionTooltipVisible(true);
        break;
      case 'assignExecutor':
        setAssignExecutorTooltipVisible(true);
        break;
      default:
        break;
    }
  };

  const handleMouseLeave = (button) => {
    switch (button) {
      case 'addAccount':
        setAddAccountTooltipVisible(false);
        break;
      case 'addSubscription':
        setAddSubscriptionTooltipVisible(false);
        break;
      case 'assignExecutor':
        setAssignExecutorTooltipVisible(false);
        break;
      default:
        break;
    }
  };

  return (
    <main className="profile-main-content">
      <h2 className="greeting">Hello {userName}!</h2>
      <h1 className="welcome-text">Welcome to your profile.</h1>

      <div className="main-divider"></div>

      <div className="profile-action-buttons">
        {/* Add Account Button */}
        <div
          className="profile-action-item"
          onMouseEnter={() => handleMouseEnter('addAccount')}
          onMouseLeave={() => handleMouseLeave('addAccount')}
        >
          <div className="profile-action-button">
            <img src="https://dashboard.codeparrot.ai/api/image/Z-l04wz4-w8v6RoA/icons-8-a.png" alt="Add" className="action-icon" />
          </div>
          <span className="profile-action-text">Add Account</span>

          {addAccountTooltipVisible && (
            <div className="tooltip tooltip-top">Click to add a new account</div>
          )}
        </div>

        {/* Add Subscription Button */}
        <div
          className="profile-action-item"
          onMouseEnter={() => handleMouseEnter('addSubscription')}
          onMouseLeave={() => handleMouseLeave('addSubscription')}
        >
          <div className="profile-action-button">
            <img src="https://dashboard.codeparrot.ai/api/image/Z-l04wz4-w8v6RoA/icons-8-s.png" alt="Subscribe" className="action-icon" />
          </div>
          <span className="profile-action-text">Add Subscription</span>

          {addSubscriptionTooltipVisible && (
            <div className="tooltip tooltip-top">Click to add a new subscription</div>
          )}
        </div>

        {/* Assign Executor Button */}
        <div
          className="profile-action-item"
          onMouseEnter={() => handleMouseEnter('assignExecutor')}
          onMouseLeave={() => handleMouseLeave('assignExecutor')}
          onClick={handleAssignExecutorClick}
        >
          <div className="profile-action-button">
            <img src="https://dashboard.codeparrot.ai/api/image/Z-l04wz4-w8v6RoA/icons-8-b.png" alt="Assign" className="action-icon" />
          </div>
          <span className="profile-action-text">Assign Executor</span>

          {assignExecutorTooltipVisible && (
            <div className="tooltip tooltip-top">Click to assign an executor</div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
