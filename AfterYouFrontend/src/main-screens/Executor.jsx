import React from 'react';

import { useNavigate } from 'react-router-dom';

import { useNavigate } from 'react-router-dom'; // Import useNavigate

import '../style/Executor.css';

const Executor = ({ 
  userName = "Max",
  assignedWill = {
    name: "Shey Silva's Last Will",
    date: "25-03-2025",
    avatarUrl: "https://dashboard.codeparrot.ai/api/image/Z-pCHwz4-w8v6RrF/icons-8-m-2.png"
  }
}) => {

  const navigate = useNavigate(); 

  const handleCardClick = () => {
    navigate('/deathcertificateupload'); 
  };

  return (
    <div className="welcome-executor">
      <header className="header">
        <img src="https://dashboard.codeparrot.ai/api/image/Z-pCHwz4-w8v6RrF/logo.png" alt="Logo" className="logo" />
        <h1 className="title">After <span>You</span></h1>
      </header>

      <main className="main-content">
        <section className="welcome-section">
          <h2 className="welcome-heading">Welcome, {userName}</h2>
          <h3 className="executor-title">You have been assigned as an executor.</h3>
          <p className="instructions">
            Follow predefined preferences and ensure digital assets are handled securely.
          </p>
        </section>

        <div className="divider"></div>

        <div className="will-card" onClick={handleCardClick} role="button" tabIndex={0}>
          <img 
            src={assignedWill.avatarUrl} 
            alt="Profile" 
            className="profile-image"
          />
          <div className="will-details">
            <h4 className="will-title">{assignedWill.name}</h4>
            <p className="assigned-date">Assigned Date: {assignedWill.date}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Executor;
