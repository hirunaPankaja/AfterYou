import React, { useState, useEffect } from 'react';
import '../style/LawyerVerificationForm.css';
import { validateLawyerId } from '../Services/validation';
import { useSearchParams } from 'react-router-dom';
import { fetchLawyerDetails } from '../Services/lawyerService';
import { verifyDeathCertificate } from '../Services/DeathCertificateService';

const LawyerVerificationForm = () => {
  const [searchParams] = useSearchParams();
  const [lawyerName, setLawyerName] = useState('');
  const [lawyerEmail, setLawyerEmail] = useState('');
  const [lawyerIdNumber, setLawyerIdNumber] = useState('');
  const [lawyerId, setLawyerId] = useState('');
  const [certId, setCertId] = useState('');

  const [idImage, setIdImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [verifyEnabled, setVerifyEnabled] = useState(false);
  const [verified, setVerified] = useState(false); // New state to show success message

  useEffect(() => {
    const id = searchParams.get("lawyerId");
    const cert = searchParams.get("certId");

    if (id) {
      setLawyerId(id);
      fetchLawyerDetails(id).then(data => {
        if (data) {
          setLawyerName(data.lawyerName);
          setLawyerEmail(data.lawyerEmail);
          setLawyerIdNumber(data.lawyerIdNumber);
        }
      });
    }
    if (cert) {
      setCertId(cert);
    }
  }, [searchParams]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setIdImage(file);
    setMessage('');

    if (!file) {
      setVerifyEnabled(false);
      return;
    }

    const error = await validateLawyerId(file, lawyerIdNumber, setProgress);

    if (error) {
      setMessage(error);
      setVerifyEnabled(false);
    } else {
      setMessage('ID image successfully validated.');
      setVerifyEnabled(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!verifyEnabled || !certId) {
      setMessage('Validation failed or certificate ID missing.');
      return;
    }

    setSubmitting(true);
    setMessage('');

    try {
      await verifyDeathCertificate(certId);
      setMessage('Verification successful.');
      setVerified(true); // Mark the process as complete
    } catch (error) {
      console.error('Error during verification:', error);
      setMessage('Verification failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="verification-container">
      {verified ? (
        <div className="success-message">
          <h2>✅ Verification Successful</h2>
          <p>The process is complete. Now close this window.</p>
        </div>
      ) : (
        <>
          <h2>Lawyer Verification Form</h2>
          <form onSubmit={handleSubmit} className="verification-form">
            <div className="readonly-field">
              <label>Name:</label>
              <input type="text" value={lawyerName} readOnly />
            </div>
            <div className="readonly-field">
              <label>Email:</label>
              <input type="email" value={lawyerEmail} readOnly />
            </div>
            <div className="readonly-field">
              <label>Lawyer ID Number:</label>
              <input type="text" value={lawyerIdNumber} readOnly />
            </div>

            <div className="input-field">
              <label>Upload ID Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>

            <progress value={progress} max="100" />
            {message && <p className="message">{message}</p>}

            <button type="submit" disabled={submitting || !verifyEnabled}>
              {submitting ? 'Verifying...' : 'Verify'}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default LawyerVerificationForm;
