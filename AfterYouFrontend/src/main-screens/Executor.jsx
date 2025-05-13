import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Executor.css';
import { getExecutorProfileByEmail } from '../Services/executorSerivce'; // Your API call

const Executor = () => {
  const navigate = useNavigate();
  const [executorData, setExecutorData] = useState(null);

  useEffect(() => {
    const executorId = localStorage.getItem("executorId");
    const email = localStorage.getItem("executorEmail");

    if (!executorId || !email) {
      navigate("/login/executor", { replace: true });
      return;
    }

    // Fetch executor profile by email
    getExecutorProfileByEmail(email)
      .then((res) => {
        setExecutorData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching executor profile:", err);
      });
  }, []);

  const handleCardClick = () => {
    navigate('/deathcertificateupload');
  };

  if (!executorData) {
    return <div className="loading">Loading executor data...</div>;
  }

  const {
    firstName,
    lastName,
    email,
    nic,
    profilePic
  } = executorData;

  const fullName = `${firstName} ${lastName}`;
  const base64Image = `data:image/jpeg;base64,${profilePic}`;

  return (
    <div className="welcome-executor">
      <header className="header">
        <img src="https://dashboard.codeparrot.ai/api/image/Z-pCHwz4-w8v6RrF/logo.png" alt="Logo" className="logo" />
        <h1 className="title">After <span>You</span></h1>
      </header>

      <main className="main-content">
        <section className="welcome-section">
          <h2 className="welcome-heading">Welcome, {firstName}</h2>
          <h3 className="executor-title">You have been assigned as an executor.</h3>
          <p className="instructions">
            Follow predefined preferences and ensure digital assets are handled securely.
          </p>
        </section>

        <div className="divider"></div>

        <div className="will-card" onClick={handleCardClick} role="button" tabIndex={0}>
          <img 
  src={base64Image} 
  alt="Profile" 
  className="profile-image"
/>

          <div className="will-details">
            <h4 className="will-title">{fullName}'s Will</h4>
            <p className="assigned-date">Email: {email}</p>
            <p className="assigned-date">NIC: {nic}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Executor;
