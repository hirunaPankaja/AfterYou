import React from 'react';
import '../style/Home.css';

const Home = ({ 
  onHomeClick = () => console.log('Home clicked'),
  onProfileClick = () => console.log('Profile clicked')
}) => {
  return (
    <div className="header">
      <div className="header-content">
        <img src="https://dashboard.codeparrot.ai/api/image/Z-EX9Ws0ZhD5c3dI/logo.png" alt="Logo" className="logo" />
        
        <div className="nav-item" onClick={onHomeClick}>
          <span className="nav-text">Home</span>
          <div className="underline"></div>
        </div>

        <button className="profile-button" onClick={onProfileClick}>
          <img src="https://dashboard.codeparrot.ai/api/image/Z-EX9Ws0ZhD5c3dI/icons-8-u.png" alt="Profile" className="profile-icon" />
        </button>
      </div>

      <button className="action-button" onClick={onHomeClick}>
        <img src="https://dashboard.codeparrot.ai/api/image/Z-EX9Ws0ZhD5c3dI/button.png" alt="Action" className="action-icon" />
      </button>
    </div>
  );
};

export default Home;
