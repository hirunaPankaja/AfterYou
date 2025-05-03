import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../style/Executor.css';

const Executor = ({ 
  userName = "Max",
  assignedWill = {
    name: "Shey Silva's Last will",
    date: "25-03-2025",
    avatarUrl: "https://dashboard.codeparrot.ai/api/image/Z-pCHwz4-w8v6RrF/icons-8-m-2.png"
  }
}) => {
  
  const navigate = useNavigate(); 
  
  const handleCardClick = () => {
    navigate('/deathcertificateupload'); // Navigate to the page on click
  };

  return (
    <div className="welcome-executor">
      <header className="header">
        <img src="https://dashboard.codeparrot.ai/api/image/Z-pCHwz4-w8v6RrF/logo.png" alt="Logo" className="logo" />
        <h1 className="title">After <span>You</span></h1>
      </header>

      <main className="main-content">
        <div className="welcome-section">
          <h2 className="welcome-heading">Welcome, {userName}</h2>
          <h3 className="executor-title">You're assigned as a executor,</h3>
          <p className="instructions">
            Follow their predefined preferences and ensure their digital assets are handled securely.
          </p>
        </div>

        <div className="divider"></div>


        <div className="will-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
          <img 
            src={assignedWill.avatarUrl} 
            alt="Profile" 
            className="profile-image"
          />
          <div className="will-details">
            <h4 className="will-title">{assignedWill.name}</h4>
            <p className="assigned-date">Assigned date | {assignedWill.date}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Executor;
