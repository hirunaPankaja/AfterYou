import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../style/LawyerRegister.css";
import { getLawyerByEmailAndUserId, completeRegistration } from '../Services/lawyerService';

const LawyerRegister = () => {
  const { email, userId } = useParams();
  const decodedEmail = decodeURIComponent(email);

  const [formData, setFormData] = useState({
    name: '',
    email: decodedEmail,
    contact: '',
    nationalId: '',
    lawyerId: '',
    identityProof: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [lawyerExists, setLawyerExists] = useState(false);

  useEffect(() => {
    const checkLawyerExists = async () => {
      try {
        if (decodedEmail && userId) {
          const response = await getLawyerByEmailAndUserId(decodedEmail, userId);
          if (response.data) {
            setFormData(prev => ({
              ...prev,
              name: response.data.lawyerName || '',
              contact: response.data.lawyerContact || '',
              email: response.data.lawyerEmail || decodedEmail
            }));
            setLawyerExists(true);
          }
        }
      } catch (err) {
        setError("Failed to verify lawyer: " + (err.response?.data?.message || err.message));
      } finally {
        setIsLoading(false);
      }
    };

    checkLawyerExists();
  }, [decodedEmail, userId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await completeRegistration(
          formData.email,
          formData.nationalId,
          formData.lawyerId,
          formData.identityProof,
          userId
      );
      setSuccess(true);
    } catch (err) {
      setError("Registration failed: " + (err.response?.data?.message || err.message));
      console.error('Registration error:', err);
    }
  };

  if (isLoading) return <div className="lawyer-form-container">Loading...</div>;
  if (!lawyerExists) return <div className="lawyer-form-container">Lawyer not found or not assigned</div>;

  return (
      <div className="lawyer-register-landing-page">
      <div className="lawyer-register-form-container">
        <div className="header">
          <div className="logo">After You</div>
          <h2>Lawyer Register</h2>
        </div>

        {error && <div className="error-message">{error}</div>}

        {success ? (
            <div className="success-message">
              Registration completed successfully!
            </div>
        ) : (
            <form className="lawyer-register-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <span className="label">Lawyer Name</span>
                <span className="value">{formData.name}</span>
              </div>

              <div className="form-row">
                <span className="label">Lawyer Email</span>
                <span className="value">{formData.email}</span>
              </div>

              <div className="form-row">
                <span className="label">Lawyer Contact</span>
                <span className="value">{formData.contact}</span>
              </div>

              <div className="form-row">
                <span className="label">National ID</span>
                <input
                    type="text"
                    name="nationalId"
                    className="input-field"
                    value={formData.nationalId}
                    onChange={handleChange}
                    required
                />
              </div>

              <div className="form-row">
                <span className="label">Lawyer ID</span>
                <input
                    type="text"
                    name="lawyerId"
                    className="input-field"
                    value={formData.lawyerId}
                    onChange={handleChange}
                    required
                />
              </div>

              <div className="form-row">
                <span className="label">Lawyer Identity Proof Upload</span>
                <input
                    type="file"
                    name="identityProof"
                    className="file-input"
                    onChange={handleChange}
                    required
                />
              </div>

              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
        )}
      </div>
      </div>
  );
};

export default LawyerRegister;