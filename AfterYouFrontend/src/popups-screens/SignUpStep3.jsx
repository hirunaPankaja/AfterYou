import React, { useState } from 'react';
import '../style/SignUpStep3.css'; // Style similar to other steps
import { validatePassword, validateAgreement } from '../Services/validation';
import useEnterSubmit from '../hooks/useEnterSubmit';
const DoneComponent = () => {
  return (
    <div className="usersignup-container">
      <div className="usersignup-background-image">
        <div className="usersignup-form-card">
          <div className="usersignup-form-topic">
            <h2 className="usersignup-form-heading">Done!</h2>
          </div>
          <div className="usersignup-heading-divider"></div>
          <p style={{ textAlign: 'center', fontSize: '16px' }}>
            Your account has been secured successfully.
          </p>
        </div>
      </div>
    </div>
  );
};

const AccountSecurityForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    securityQuestion: '',
    securityAnswer: '',
    agreeTerms: false,
    agreeDataPolicy: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = () => {
    // Normally you'd validate and send data here
    setIsSubmitted(true);
  };
  const handleFormValidation = () => {
    const passwordError = validatePassword(formData.password, formData.confirmPassword);
    if (passwordError) {
      alert(passwordError);
      return false;
    }

    const agreementError = validateAgreement(formData.agreeTerms, formData.agreeDataPolicy);
    if (agreementError) {
      alert(agreementError);
      return false;
    }

    return true; // Validation passed
  };
    
  useEnterSubmit(handleFormValidation);
  
  if (isSubmitted) {
    return <DoneComponent />;
  }

 


  return (
    <div className="usersignup-container">
      <div className="usersignup-background-image">
        <div className="usersignup-form-card">
          <div className="usersignup-form-topic">
            <h2 className="usersignup-form-heading">Account Security</h2>
          </div>
          <div className="usersignup-heading-divider"></div>
          <div className="usersignup-form-grid">

            <div className="usersignup-form-field">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="usersignup-form-field">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="usersignup-form-field">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <div className="usersignup-form-field">
              <label>Security Question</label>
              <input
                type="text"
                name="securityQuestion"
                value={formData.securityQuestion}
                onChange={handleChange}
              />
            </div>

            <div className="usersignup-form-field usersignup-full-width">
              <label>Security Answer</label>
              <input
                type="text"
                name="securityAnswer"
                value={formData.securityAnswer}
                onChange={handleChange}
              />
            </div>

            <div className="usersignup-form-field usersignup-full-width">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                />
                Agree to Terms & Privacy Policy
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeDataPolicy"
                  checked={formData.agreeDataPolicy}
                  onChange={handleChange}
                />
                Agree to Data Processing & Storage
              </label>
            </div>

          </div>
          <div className="usersignup-next-button">
          <button
            className="usersignup-step3-submit-btn"
            onClick={() => {
              if (handleFormValidation()) {
                  handleSubmit();
                }
            }
          }
          >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSecurityForm;
