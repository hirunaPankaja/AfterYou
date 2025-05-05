import React, { useState, useEffect, useRef } from 'react';
import '../style/Header.css';

function ProfileHeader({
  goToHome,
  goToAccounts,
  goToSubscription,
  goToUserProfile,
  activePage,
  refreshPage
}) {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const togglePopup = () => {
    setShowPopup(prev => !prev);
  };

  const handleClickOutside = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Wrapper for all nav clicks to support refresh
  const handleNavClick = (e, targetPage, goToFn) => {
    e.preventDefault();
    if (activePage === targetPage) {
      refreshPage(); // same page: refresh
    } else {
      goToFn(e); // navigate
    }
  };

  return (
    <header className="profile-header">
      <img
        src="https://dashboard.codeparrot.ai/api/image/Z-l04wz4-w8v6RoA/logo.png"
        alt="Logo"
        className="header-logo"
      />

      <nav className="profile-navigation">
        <a href="#home" className={`nav-link ${activePage === 'home' ? 'active' : ''}`} onClick={(e) => handleNavClick(e, 'home', goToHome)}>Home</a>
        <a href="#account" className={`nav-link ${activePage === 'accounts' ? 'active' : ''}`} onClick={(e) => handleNavClick(e, 'accounts', goToAccounts)}>Accounts</a>
        <a href="#" className={`nav-link ${activePage === 'subscription' ? 'active' : ''}`} onClick={(e) => handleNavClick(e, 'subscription', goToSubscription)}>Subscription</a>
        <a href="#" className={`nav-link ${activePage === 'user-profile' ? 'active' : ''}`} onClick={(e) => handleNavClick(e, 'user-profile', goToUserProfile)}>Profile</a>
      </nav>

      <div className="user-info" onClick={togglePopup}>
        <span className="user-name">Shey</span>
        <img
          src="https://dashboard.codeparrot.ai/api/image/Z-l04wz4-w8v6RoA/icons-8-m.png"
          alt="User"
          className="header-user-avatar"
        />
      </div>

      {showPopup && (
        <div className="profile-popup" ref={popupRef}>
          <div className="popup-header">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
              alt="Avatar"
              className="popup-avatar"
            />
            <h4>Shey Silva</h4>
            <p>sheysilva1@gmail.com</p>
          </div>
          <div className="popup-option"><i className="fas fa-cog"></i> Account Settings</div>
          <div className="popup-option"><i className="fas fa-lock"></i> Change Password</div>
          <hr />
          <div className="popup-option logout"><i className="fas fa-sign-out-alt"></i> Logout</div>
        </div>
      )}
    </header>
  );
}

export default ProfileHeader;