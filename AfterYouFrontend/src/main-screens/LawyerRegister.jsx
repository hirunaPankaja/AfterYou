import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../style/LawyerRegister.css";
import { getLawyerByEmailAndUserId, completeRegistration } from '../Services/lawyerService';

const LawyerRegister = () => {
  const { email, userId } = useParams(); // Get email and userId from URL
  const decodedEmail = decodeURIComponent(email); // Decode the email in case it has special characters

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
    // Check if lawyer exists when component mounts
    const checkLawyerExists = async () => {
      try {
        if (decodedEmail && userId) {
          const response = await getLawyerByEmailAndUserId(decodedEmail, userId);
          if (response.data) {
            setFormData(prev => ({
              ...prev,
              name: response.data.lawyerName || '',
              contact: response.data.lawyerContact || '',
              email: response.data.lawyerEmail || decodedEmail // Use the email from response if available
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
    setSuccess(false);

    try {
      const response = await completeRegistration(
          formData.email,
          formData.nationalId,
          formData.lawyerId,
          formData.identityProof,
          userId
      );

      setSuccess(true);
      console.log('Registration completed:', response.data);
    } catch (err) {
      setError("Registration failed: " + (err.response?.data?.message || err.message));
      console.error('Registration error:', err);
    }
  };

  if (isLoading) return <div className="lawyer-form-container">Loading...</div>;
  if (!lawyerExists) return <div className="lawyer-form-container">Lawyer not found or not assigned</div>;

  return (
      <div className="lawyer-form-container">
        <h2>Complete Lawyer Registration</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Registration completed successfully!</div>}

        <form className="lawyer-register-form" onSubmit={handleSubmit}>
          <div className="lawyer-form-group">
            <label>Lawyer Name</label>
            <input
                type="text"
                name="name"
                placeholder="Enter Lawyer Name"
                value={formData.name}
                onChange={handleChange}
                readOnly
            />
          </div>
          <div className="lawyer-form-group">
            <label>Lawyer Email</label>
            <input
                type="email"
                name="email"
                placeholder="Enter Lawyer Email"
                value={formData.email}
                onChange={handleChange}
                readOnly
            />
          </div>
          <div className="lawyer-form-group">
            <label>Lawyer Contact</label>
            <input
                type="tel"
                name="contact"
                placeholder="Enter Contact Number"
                value={formData.contact}
                onChange={handleChange}
                readOnly
            />
          </div>
          <div className="lawyer-form-group">
            <label>National ID</label>
            <input
                type="text"
                name="nationalId"
                placeholder="Enter National ID"
                value={formData.nationalId}
                onChange={handleChange}
                required
            />
          </div>
          <div className="lawyer-form-group">
            <label>Lawyer ID</label>
            <input
                type="text"
                name="lawyerId"
                placeholder="Enter Lawyer ID"
                value={formData.lawyerId}
                onChange={handleChange}
                required
            />
          </div>
          <div className="lawyer-form-group">
            <label>Lawyer Identity Proof Upload</label>
            <input
                type="file"
                name="identityProof"
                onChange={handleChange}
                required
            />
          </div>
          <button type="submit" className="submit-button">
            Complete Registration
          </button>
        </form>
      </div>
  );
};

export default LawyerRegister;