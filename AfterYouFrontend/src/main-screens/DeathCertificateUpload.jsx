import React, { useState } from 'react';
import '../style/DeathCertificateUpload.css';

const DeathCertificateUpload = () => {
  const [fullName, setFullName] = useState('');
  const [dateOfDeath, setDateOfDeath] = useState('');
  const [deathCertificate, setDeathCertificate] = useState(null);
  const [status, setStatus] = useState('Pending');
  const [processingTime, setProcessingTime] = useState('48 hrs');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Submitted:', { fullName, dateOfDeath, deathCertificate });
  };

  const handleFileChange = (e) => {
    setDeathCertificate(e.target.files[0]);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', border: '1px solid #ccc' }}>
      <div style={{ width: '45%' }}>
        <h2>Upload Death Certificate</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Full Name of deceased</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Date of death</label>
            <input
              type="date"
              value={dateOfDeath}
              onChange={(e) => setDateOfDeath(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Upload Death Certificate</label>
            <input
              type="file"
              onChange={handleFileChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div style={{ width: '45%' }}>
        <h2>Waiting For Legal Approval</h2>
        <p>Your request is under review.</p>
        <div>
          <label>Status</label>
          <span style={{ color: 'yellow' }}>●</span>
          <span>{status}</span>
        </div>
        <div>
          <label>Expected Processing Time</label>
          <span>{processingTime}</span>
        </div>
        <button>Done</button>
      </div>
    </div>
  );
};

export default DeathCertificateUpload;
