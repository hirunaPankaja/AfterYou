import React, { useState, useEffect, useRef } from 'react';
import '../style/Header.css';
import ChangePassword from '../popups-screens/ChangePassword.jsx';
import { getUserProfile } from '../Services/userService.js';
import { useNavigate } from 'react-router-dom';

function ProfileHeader({
  goToHome,
  goToAccounts,
  goToSubscription,
  goToUserProfile,
  activePage,
  refreshPage,

}) {
  const [showPopup, setShowPopup] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [profile, setProfile] = useState(null);
  const popupRef = useRef(null);
  const modalRef = useRef(null);

  const togglePopup = () => {
    setShowPopup(prev => !prev);
  };

  

  const handleClickOutside = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setShowPopup(false);
    }
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowChangePassword(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ✅ Fetch profile data
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('jwtToken'); // 🛠️ Corrected key

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

  const handleNavClick = (e, targetPage, goToFn) => {
    e.preventDefault();
    if (activePage === targetPage) {
      refreshPage();
    } else {
      goToFn(e);
    }
  };

  const navigate = useNavigate();

  const handleLogoutClick = (e) => {

    e.preventDefault();
    setShowPopup(false);

    // Clear all user-related data from localStorage
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userData'); // if you store additional user data
    localStorage.removeItem('userEmail'); // example of other possible user data

    // Alternatively, clear everything from localStorage
    // localStorage.clear();

    // Redirect to landing page with a hard refresh to clear any cached data
    navigate('/');
    window.location.reload(true); // force a hard refresh (though parameter is deprecated, it may still work)
  };

  const handleAccountSettings = (e) => {
    e.preventDefault();
    setShowPopup(false);
    goToUserProfile(e);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setShowPopup(false);
    setShowChangePassword(true);
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
        <a href="#subscription" className={`nav-link ${activePage === 'subscription' ? 'active' : ''}`} onClick={(e) => handleNavClick(e, 'subscription', goToSubscription)}>Subscription</a>
        <a href="#profile" className={`nav-link ${activePage === 'user-profile' ? 'active' : ''}`} onClick={(e) => handleNavClick(e, 'user-profile', goToUserProfile)}>Profile</a>
      </nav>

      {/* User info avatar */}
<div className="user-info" onClick={togglePopup}>
  <span className="user-name">{profile?.firstName || 'User'}</span>
  <img
    src={
      profile?.profilePic
        ? `data:image/jpeg;base64,${profile.profilePic}`
        : "https://dashboard.codeparrot.ai/api/image/Z-l04wz4-w8v6RoA/icons-8-m.png"
    }
    alt="User"
    className="header-user-avatar"
  />
</div>

{/* Popup avatar */}
{showPopup && (
  <div className="profile-popup" ref={popupRef}>
    <div className="popup-header">
      <img
        src={
          profile?.profilePic
            ? `data:image/jpeg;base64,${profile.profilePic}`
            : "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
        }
        alt="Avatar"
        className="popup-avatar"
      />
            <h4>{profile?.firstName} {profile?.lastName}</h4>
            <p>{profile?.email}</p>
          </div>
          <div className="popup-option" onClick={handleAccountSettings}>
            <i className="fas fa-cog"></i> Account Settings
          </div>
          <div className="popup-option" onClick={handleChangePassword}>
            <i className="fas fa-lock"></i> Change Password
          </div>
          <hr />
          <div className="popup-option logout" onClick={handleLogoutClick}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </div>
        </div>
      )}

      {showChangePassword && (
        <div className="modal-overlay">
          <div className="change-password-modal" ref={modalRef}>
            <ChangePassword />
          </div>
        </div>
      )}
    </header>
  );
}

export default ProfileHeader;
