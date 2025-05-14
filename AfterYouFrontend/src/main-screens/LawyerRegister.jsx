import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../style/LawyerRegister.css";
import lawyerLandingpage from "../assets/logo.png";
import { validateLawyerId } from '../Services/validation'; 
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
  setSuccess(false);

  try {
    // Validate uploaded identity proof image against entered lawyer ID
    const validationError = await validateLawyerId(
      formData.identityProof,
      formData.lawyerId,
      null // You can use a setProgress state here if needed
    );

    if (validationError) {
      setError(validationError);
      return;
    }

    // If validation passes, continue registration
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


  if (isLoading) return <div className="lawyer-register-loading">Loading...</div>;
  if (!lawyerExists) return <div className="lawyer-register-not-found">Lawyer not found or not assigned</div>;

  return (
    <div className="lawyer-register-landing-page">
      {/* ✅ Logo and Title Added to Background Page */}
      <div className="lawyer-register-background-header">
        <img src={lawyerLandingpage} alt="Logo" className="lawyer-register-logo" />
        <h2 className="lawyer-register-title">
          <span className="after">After</span> <span className="you">You</span>
        </h2>
      </div>

      <div className="lawyer-register-form">
        <h2>Lawyer Register</h2>

        {error && <div className="lawyer-register-error">{error}</div>}

        {success ? (
            <div className="lawyer-register-success">
              Registration completed successfully!
            </div>
        ) : (
            <form className="lawyer-register-form-content" onSubmit={handleSubmit}>
              <div className="lawyer-register-row">
                <span className="lawyer-register-label">Lawyer Name</span>
                <span className="lawyer-register-value">{formData.name}</span>
              </div>

              <div className="lawyer-register-row">
                <span className="lawyer-register-label">Lawyer Email</span>
                <span className="lawyer-register-value">{formData.email}</span>
              </div>

              <div className="lawyer-register-row">
                <span className="lawyer-register-label">Lawyer Contact</span>
                <span className="lawyer-register-value">{formData.contact}</span>
              </div>

              <div className="lawyer-register-row">
                <span className="lawyer-register-label">National ID</span>
                <input
                    type="text"
                    name="nationalId"
                    className="lawyer-register-input"
                    value={formData.nationalId}
                    onChange={handleChange}
                    required
                />
              </div>

              <div className="lawyer-register-row">
                <span className="lawyer-register-label">Lawyer ID</span>
                <input
                    type="text"
                    name="lawyerId"
                    className="lawyer-register-input"
                    value={formData.lawyerId}
                    onChange={handleChange}
                    required
                />
              </div>

              <div className="lawyer-register-row">
                <span className="lawyer-register-label">Lawyer Identity Proof Upload</span>
                <input
                    type="file"
                    name="identityProof"
                    className="lawyer-register-file-input"
                    onChange={handleChange}
                    required
                />
              </div>

              <button type="submit" className="lawyer-register-submit">
                Submit
              </button>
            </form>
        )}
      </div>
    </div>
  );
};

export default LawyerRegister;