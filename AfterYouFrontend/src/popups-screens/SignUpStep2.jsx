import React, { useState } from 'react';
import '../style/SignUpStep1.css';
import AccountSecurityForm from './SignUpStep3'; // Import next step

const IDVerificationForm = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    idType: '',
    idNumber: '',
    idDocument: null,
    selfieWithId: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: files[0] }));
  };

  const handleNext = () => {
    // You can add validation here before proceeding
    setStep(2);
  };

  if (step === 2) {
    return <AccountSecurityForm onSubmit={(data) => console.log('Final Submit:', data)} />;
  }

  return (
    <div className="usersignup-container">
      <div className="usersignup-background-image">
        <div className="usersignup-form-card">
          <div className="usersignup-form-topic">
            <h2 className="usersignup-form-heading">Identification & Verification</h2>
          </div>
          <div className="usersignup-heading-divider"></div>
          <div className="usersignup-form-grid">
            <div className="usersignup-form-field">
              <label>Government ID Type</label>
              <select name="idType" value={formData.idType} onChange={handleChange}>
                <option value="">Select ID Type</option>
                <option value="passport">Passport</option>
                <option value="driver_license">Driver's License</option>
                <option value="national_id">National ID</option>
              </select>
            </div>

            <div className="usersignup-form-field">
              <label>ID Number</label>
              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
              />
            </div>

            <div className="usersignup-form-field">
              <label>Upload ID Document</label>
              <input
                type="file"
                name="idDocument"
                accept="image/*,application/pdf"
                onChange={handleFileChange}
              />
            </div>

            <div className="usersignup-form-field">
              <label>Selfie with ID for Verification</label>
              <input
                type="file"
                name="selfieWithId"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="usersignup-next-button">
            <button className="usersignup-step1-submit-btn" onClick={handleNext}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IDVerificationForm;
