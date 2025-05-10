import React, { useState } from 'react';
import '../style/SignUpStep1.css';
import logo from '../assets/logo.png';
import { validateEmail, validatePhoneNumber } from '../Services/validation';

const SignUpForm = ({ onNext }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    phoneNumber: '',
    nationality: '',
    address: '',
    gender: '',
    emergencyContact: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  
  const handleGenderChange = (gender) => {
    setFormData(prevState => ({
      ...prevState,
      gender
    }));
  };

  return (
    <div className="usersignup-container">
      <div className="usersignup-background-image">
        <div className="usersignup-form-card">
          <div className="usersignup-form-topic">
            <h2 className="usersignup-form-heading">Personal Information</h2>
          </div>
          <div className="usersignup-heading-divider"></div>
          <div className="usersignup-form-grid">
            <div className="usersignup-form-field">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>

            <div className="usersignup-form-field">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>

            <div className="usersignup-form-field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="usersignup-form-field">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
              />
            </div>

            <div className="usersignup-form-field">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>

            <div className="usersignup-form-field">
              <label>Nationality</label>
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
              />
            </div>

            <div className="usersignup-form-field">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>

            <div className="usersignup-form-field">
              <label>Gender</label>
              <div className="usersignup-gender-buttons">
                <button
                  type="button"
                  className={`usersignup-gender-button ${formData.gender === 'female' ? 'active' : ''}`}
                  onClick={() => handleGenderChange('female')}
                >
                  Female
                </button>
                <button
                  type="button"
                  className={`usersignup-gender-button ${formData.gender === 'male' ? 'active' : ''}`}
                  onClick={() => handleGenderChange('male')}
                >
                  Male
                </button>
              </div>
            </div>

            <div className="usersignup-form-field usersignup-full-width">
              <label>Emergency Contact No</label>
              <input
                type="tel"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="usersignup-next-button">
          <button
  className="usersignup-step1-submit-btn"
  onClick={() => {
    const emailError = validateEmail(formData.email);
    const phoneError = validatePhoneNumber(formData.emergencyContact, formData.phoneNumber);

    if (emailError) {
      alert(emailError);
      return;
    }

    if (phoneError) {
      alert(phoneError);
      return;
    }

    onNext(); // Call only if all validations pass
  }}
>
  Next
</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
