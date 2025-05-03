import React, { useState } from 'react'; // <-- import useState
import '../style/ProfilePage.css';
import useNavigation from '../hooks/useNavigate';
import AddAccount from '../popups-screens/AddAccount';
import AssignExecutor from './AssignExecutor';

const ProfilePage = ({ userName = "Shey Silva" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showExecutors, setShowExecutors] = useState(false); // new state
  

  const handleAssignExecutorClick = () => {
    setShowExecutors(true); // switch to executor view instead of navigate
  };

  const handleBackToProfile = () => {
    setShowExecutors(false); // optional: to go back to profile
  };

  const handleOpenForm = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseForm = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const AccountFormModal = () => {
    if (!isModalOpen) return null;
    return (
      <div className="modal-overlay-account" onClick={handleCloseForm}>
        <button className="close-account" onClick={handleCloseForm}>X</button>
        <div className="modal-content-account" onClick={(e) => e.stopPropagation()}>
          <AddAccount />
        </div>
      </div>
    );
  };

  // ✅ Conditional rendering of page content
  return (
    <main className="profile-main-content">
      {showExecutors ? (
        <>
        <button onClick={handleBackToProfile}>⬅ Back to Profile</button>
          <AssignExecutor />
         
        </>
      ) : (
        <>
          <h2 className="greeting">Hello {userName}!</h2>
          <h1 className="welcome-text">Welcome to your profile.</h1>

          <div className="main-divider"></div>

          <div className="profile-action-buttons">
            {/* Add Account Button */}
            <div className="profile-action-item">
              <div className="profile-action-button" onClick={handleOpenForm}>
                <img src="https://dashboard.codeparrot.ai/api/image/Z-l04wz4-w8v6RoA/icons-8-a.png" alt="Add" className="action-icon" />
              </div>
              <span className="profile-action-text">Add Account</span>
              <div className="tooltip">
                You can add accounts that you already have. Executor or Automatically will handle them for you.
              </div>
            </div>

            {/* Add Subscription Button */}
            <div className="profile-action-item">
              <div className="profile-action-button" onClick={handleOpenForm}>
                <img src="https://dashboard.codeparrot.ai/api/image/Z-l04wz4-w8v6RoA/icons-8-s.png" alt="Subscribe" className="action-icon" />
              </div>
              <span className="profile-action-text">Add Subscription</span>
              <div className="tooltip">
                You can add subscriptions that you already have. Executor or Automatically will handle them for you.
              </div>
            </div>

            {/* Assign Executor Button */}
            <div className="profile-action-item" onClick={handleAssignExecutorClick}>
              <div className="profile-action-button">
                <img src="https://dashboard.codeparrot.ai/api/image/Z-l04wz4-w8v6RoA/icons-8-b.png" alt="Assign" className="action-icon" />
              </div>
              <span className="profile-action-text">Assign Executor</span>
              <div className="tooltip">
                You can assign an executor to your account. Executor will handle it for you.
              </div>
            </div>
          </div>
          <AccountFormModal />
        </>
      )}
    </main>
  );
};
export default ProfilePage;