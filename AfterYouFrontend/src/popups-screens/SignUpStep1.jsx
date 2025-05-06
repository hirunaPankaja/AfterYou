import React, { useState } from 'react';
import '../style/SignUpStep1.css';
import logo from '../assets/logo.png';

const SignUpForm = ({ onNext }) => {
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    dateOfBirth: '1990-01-01',
    phoneNumber: '1234567890',
    nationality: 'American',
    address: '123 Main St',
    gender: 'female',
    emergencyContact: '0987654321'
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
    <div className="signup-container">
      <div className="background-image">
        <div className="form-card" style={{ backgroundImage: `url(${logo})` }}>
          <div className="form-topic">
            <h2 className="form-heading">Personal Information</h2>
          </div>
          <div className="heading-divider"></div>
          <div className="form-grid">
            <div className="form-field">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-field">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-field">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-field">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-field">
              <label>Nationality</label>
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-field">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-field">
              <label>Gender</label>
              <div className="gender-buttons">
                <button
                  type="button"
                  className={`gender-button ${formData.gender === 'female' ? 'active' : ''}`}
                  onClick={() => handleGenderChange('female')}
                >
                  Female
                </button>
                <button
                  type="button"
                  className={`gender-button ${formData.gender === 'male' ? 'active' : ''}`}
                  onClick={() => handleGenderChange('male')}
                >
                  Male
                </button>
              </div>
            </div>

            <div className="form-field full-width">
              <label>Emergency Contact No</label>
              <input
                type="tel"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="next-button">
            <button className="signup-step1-submit-btn" onClick={onNext}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;

