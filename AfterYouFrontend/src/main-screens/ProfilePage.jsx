import React, { useState, useEffect } from 'react';
import '../style/ProfilePage.css';
import AccountSelectionModal from '../popups-screens/AccountSelectionModal.jsx';
import SubscriptionForm from '../popups-screens/SubscriptionForm.jsx'; // ✅ Correct import
import AssignExecutor from './AssignExecutor';
import { getUserProfile } from '../Services/userService.js';

const ProfilePage = ({ primaryEmail }) => {
  const [isAccountSelectionOpen, setIsAccountSelectionOpen] = useState(false);
  const [isSubscriptionFormOpen, setIsSubscriptionFormOpen] = useState(false);
  const [showExecutors, setShowExecutors] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('jwtToken');
    if (userId && token) {
      getUserProfile(parseInt(userId), token)
        .then(res => {
          setProfile(res.data);
        })
        .catch(err => {
          console.error("Failed to load profile", err);
        });
    }
  }, []);

  const handleAssignExecutorClick = () => {
    setShowExecutors(true);
  };

  const handleOpenAccountSelection = (e) => {
    e.preventDefault();
    setIsAccountSelectionOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseAccountSelection = () => {
    setIsAccountSelectionOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleOpenSubscriptionForm = (e) => {
    e.preventDefault();
    setIsSubscriptionFormOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseSubscriptionForm = () => {
    setIsSubscriptionFormOpen(false);
    document.body.style.overflow = "auto";
  };

  const AccountFormModal = () => {
    if (!isAccountSelectionOpen && !isSubscriptionFormOpen) return null;
    return (
      <div className="modal-overlay-account" onClick={isAccountSelectionOpen ? handleCloseAccountSelection : handleCloseSubscriptionForm}>
        <button className="close-account" onClick={isAccountSelectionOpen ? handleCloseAccountSelection : handleCloseSubscriptionForm}>X</button>
        <div className="modal-content-account" onClick={(e) => e.stopPropagation()}>
          {isAccountSelectionOpen && <AccountSelectionModal isOpen={isAccountSelectionOpen} onClose={handleCloseAccountSelection} />}
          {isSubscriptionFormOpen && <SubscriptionForm primaryEmail={primaryEmail} />} 
        </div>
      </div>
    );
  };

  return (
    <main className="profile-main-content">
      {showExecutors ? (
        <>
          <AssignExecutor />
        </>
      ) : (
        <>
          <h2 className="greeting">
            Hello {profile ? `${profile.firstName} ${profile.lastName}` : "User"}!
          </h2>
          <h1 className="welcome-text">Welcome to your profile.</h1>

          <div className="main-divider"></div>

          <div className="profile-action-buttons">
            {/* Add Account Button */}
            <div className="profile-action-item">
              <div className="profile-action-button" onClick={handleOpenAccountSelection}>
                <img src="https://dashboard.codeparrot.ai/api/image/Z-l04wz4-w8v6RoA/icons-8-a.png" alt="Add" className="action-icon" />
              </div>
              <span className="profile-action-text">Add Account</span>
              <div className="tooltip">
                You can add accounts that you already have. Executor or Automatically will handle them for you.
              </div>
            </div>

            {/* Add Subscription Button */}
            <div className="profile-action-item">
              <div className="profile-action-button" onClick={handleOpenSubscriptionForm}>
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
