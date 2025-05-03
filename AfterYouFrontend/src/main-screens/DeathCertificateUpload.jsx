import React, { useState, useEffect } from 'react';
import '../style/DeathCertificateUpload.css';

const DeathCertificateUpload = () => {
  const [fullName, setFullName] = useState('');
  const [dateOfDeath, setDateOfDeath] = useState('');
  const [deathCertificate, setDeathCertificate] = useState(null);
  const [status, setStatus] = useState('Pending');
  const [processingTime, setProcessingTime] = useState('48 hrs');
  const [loadingWidth, setLoadingWidth] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isProcessing) {
      const totalTimeInMilliseconds = 5000; // Simulated backend response time
      const updateInterval = 100; // Update every 100ms
      const increment = 100 / (totalTimeInMilliseconds / updateInterval);

      const loadingInterval = setInterval(() => {
        setLoadingWidth((prev) => {
          if (prev + increment >= 100) {
            clearInterval(loadingInterval);
            return 100;
          }
          return prev + increment;
        });
      }, updateInterval);

      return () => clearInterval(loadingInterval);
    }
  }, [isProcessing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Processing');
    setIsProcessing(true);
    setLoadingWidth(0);

    try {
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulated API call
      setStatus('Approved');
    } catch (error) {
      console.error('Error:', error);
      setStatus('Error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e) => {
    setDeathCertificate(e.target.files[0]);
  };

  return (
    <div className="certificate-container">
      <div className="upload-section">
        <h2 className="section-title">Upload Death Certificate</h2>
        <form onSubmit={handleSubmit} className="certificate-form">
          <div className="input-group">
            <label className="input-label">Full Name of deceased</label>
            <input
              type="text"
              className="certificate-input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label className="input-label">Date of death</label>
            <input
              type="date"
              className="certificate-input"
              value={dateOfDeath}
              onChange={(e) => setDateOfDeath(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label className="input-label">Upload Death Certificate</label>
            <input
              type="file"
              className="certificate-input"
              onChange={handleFileChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
      <div className="approval-section">
        <h2 className="section-title">Waiting For Legal Approval</h2>
        <p className="review-text">Your request is under review.</p>
        <div className="status-container">
          <label className="status-label">Status</label>
          <span className={`status-indicator ${status === 'Approved' ? 'approved' : ''}`}>
            ●
          </span>
          <span className="status-value">{status}</span>
        </div>
        <div className="processing-container">
          <label className="processing-label">Expected Processing Time</label>
          <span className="processing-value">{isProcessing ? 'Loading...' : processingTime}</span>
          {isProcessing && (
            <div className="loading-bar">
              <div className="loading-fill" style={{ width: `${loadingWidth}%` }}></div>
            </div>
          )}
        </div>
        <button className="done-button" disabled={status !== 'Approved'}>Done</button>
      </div>
    </div>
  );
};

export default DeathCertificateUpload;
