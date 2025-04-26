import React from 'react';//encdcd
import '../style/Header.css';
function ProfileHeader({ goToHome, goToAccounts, goToSubscription, goToUser }) {
  return (
    <header className="profile-header">
      <img src="https://dashboard.codeparrot.ai/api/image/Z-l04wz4-w8v6RoA/logo.png" alt="Logo" className="header-logo" />

      <nav className="profile-navigation">
        <a href="#" className="nav-link nav-home" onClick={goToHome}>Home</a>
        <a href="#" className="nav-link" onClick={goToAccounts}>Accounts</a>
        <a href="#" className="nav-link" onClick={goToSubscription}>Subscription</a>
        <a href="#" className="nav-link" onClick={goToUser}>Profile</a>
      </nav>

      <div className="user-info">
        <span className="user-name">Shey</span>
        <img src="https://dashboard.codeparrot.ai/api/image/Z-l04wz4-w8v6RoA/icons-8-m.png" alt="User" className="header-user-avatar" />
      </div>
    </header>
  );
}

export default ProfileHeader;
