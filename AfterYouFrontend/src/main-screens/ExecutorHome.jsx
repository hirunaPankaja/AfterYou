import React, { useState, useEffect } from 'react';
import '../style/ExecutorProfile.css';

const ExecutorProfile = () => {
  const [executorId, setExecutorId] = useState('');
  const [executorData, setExecutorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get executorId from localStorage when component mounts
    const id = localStorage.getItem('executorId');
    if (!id) {
      setError('Executor ID not found in localStorage');
      setLoading(false);
      return;
    }
    setExecutorId(id);
  }, []);

  useEffect(() => {
    const fetchExecutorData = async () => {
      if (!executorId) return;
      
      try {
        const response = await fetch(`http://localhost:8081/api/executor/data/data/${executorId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch executor data');
        }
        const data = await response.json();
        setExecutorData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExecutorData();
  }, [executorId]);

  const handleDownload = async () => {
    if (!executorId) return;
    
    try {
      const response = await fetch(`http://localhost:8081/api/executor/data/download/${executorId}`);
      if (!response.ok) {
        throw new Error('Failed to download data');
      }
      
      const contentDisposition = response.headers.get('content-disposition');
      const filename = contentDisposition 
        ? contentDisposition.split('filename=')[1].replace(/"/g, '')
        : `executor_${executorId}_data.zip`;
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      alert(`Download failed: ${err.message}`);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!executorData) return <div className="no-data">No data available</div>;

  return (
    <div className="executor-profile-container">
      <h1>Executor Profile</h1>
      
      {/* Primary Account Card */}
      <div className="card primary-account">
        <h2>Primary Account</h2>
        <div className="account-details">
          <p><strong>Email:</strong> {executorData.email}</p>
        </div>
        <button onClick={handleDownload} className="download-btn">
          Download Data
        </button>
      </div>
      
      {/* Rest of your component remains the same */}
      <h2>Linked Accounts</h2>
      <div className="linked-accounts-grid">
        {executorData.linkedAccounts.map((account, index) => (
          <a 
            key={index} 
            href={account.profileUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="card linked-account"
          >
            <h3>{account.platform}</h3>
            <p><strong>Username:</strong> {account.username}</p>
            <p className="profile-link">View Profile →</p>
          </a>
        ))}
      </div>
      
      <h2>Subscriptions</h2>
      <div className="subscriptions-grid">
        {executorData.subscriptions.map((subscription, index) => (
          <div key={index} className="card subscription">
            <h3>{subscription.platformName}</h3>
            <p><strong>Plan:</strong> {subscription.subscriptionPlan}</p>
            <p><strong>Price:</strong> {subscription.planPrice}</p>
            <p><strong>Start Date:</strong> {subscription.subscriptionStartDate}</p>
            <p><strong>End Date:</strong> {subscription.subscriptionEndDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExecutorProfile;