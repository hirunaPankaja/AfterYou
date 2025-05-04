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
            {/* All form fields stay the same... */}
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
            <button className="next-button" onClick={onNext}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
