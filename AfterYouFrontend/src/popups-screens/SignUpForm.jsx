import React, { useState } from 'react';
import '../style/SignUp.css'; // Unified CSS file
import logo from '../assets/logo.png';
import { validateEmail, validatePhoneNumber, validateIdentityImages, validatePassword, validateAgreement } from '../Services/validation';
import {registerUser} from '../Services/userService';
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

const SignUpForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    phoneNumber: '',
    nationality: '',
    address: '',
    gender: '',
    emergencyContact: '',
    identityType: '',
    identityNumber: '',
    idDocument: null,
    selfieWithId: null,
    username: '',
    password: '',
    confirmPassword: '',
    securityQuestion: '',
    securityAnswer: '',
    agreeTerms: false,
    agreeDataPolicy: false,
  });

  const [validationError, setValidationError] = useState('');
  const [progress, setProgress] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

const handleSubmit = async () => {
  setValidationError('');

  // Validate Step 3 (Account Security)
  const passwordError = validatePassword(formData.password, formData.confirmPassword);
  if (passwordError) {
    setValidationError(passwordError);
    return;
  }

  const agreementError = validateAgreement(formData.agreeTerms, formData.agreeDataPolicy);
  if (agreementError) {
    setValidationError(agreementError);
    return;
  }

  // BUILD THE PAYLOAD as backend expects
  const payload = {
    userBasicInfo: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      dob: formData.dateOfBirth,
      phoneNumber: formData.phoneNumber,
      nationality: formData.nationality,
      address: formData.address,
      gender: formData.gender,
      emergencyNumber: formData.emergencyContact,
      credentials: {
        email: formData.email,
        password: formData.password,
        username: formData.username
      },
      accountSecurity: {
        securityQuestion: formData.securityQuestion,
        securityAnswer: formData.securityAnswer
      },
      identity: {
        identityType: formData.idType || formData.identityType, // support both field names
        identityNumber: formData.idNumber || formData.identityNumber
      }
    }
  };

  try {
    const data = await registerUser(payload); // Use ONLY the exported method
    setIsSubmitted(true);
  } catch (error) {
    setValidationError(error.message || 'Something went wrong.');
  }
 // <-- This closing brace was missing

};

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: files[0]
    }));
  };

  const handleGenderChange = (gender) => {
    setFormData(prevState => ({
      ...prevState,
      gender
    }));
  };

  const handleNext = async () => {
  setValidationError('');
  setProgress(0);

  if (step === 1) {
    // Validate Step 1 (Personal Information)
    const emailError = validateEmail(formData.email);
    const phoneError = validatePhoneNumber(formData.emergencyContact, formData.phoneNumber);

    if (emailError || phoneError) {
      setValidationError(emailError || phoneError);
      return;
    }
  } else if (step === 2) {
    // Validate Step 2 (ID Verification)
    if (!formData.idType || !formData.idNumber || !formData.idDocument || !formData.selfieWithId) {
      setValidationError('All ID verification fields are required.');
      return;
    }

    const idError = await validateIdentityImages(
      formData.idNumber,
      formData.idDocument,
      formData.selfieWithId,
      setProgress
    );

    if (idError) {
      setValidationError(idError);
      return;
    }
  } else if (step === 3) {
    // Validate Step 3 (Account Security)
    const passwordError = validatePassword(formData.password, formData.confirmPassword);
    if (passwordError) {
      setValidationError(passwordError);
      return;
    }

    const agreementError = validateAgreement(formData.agreeTerms, formData.agreeDataPolicy);
    if (agreementError) {
      setValidationError(agreementError);
      return;
    }

    // 👇 Final submission step
    await handleSubmit();
    return;
  }

  setStep(prevStep => prevStep + 1);
};


  useEnterSubmit(handleNext);

  if (isSubmitted) {
  return (
    <div className="signup-success-container">
      <div className="signup-success-card">
        <h2 className="signup-success-heading">🎉 Registration Complete!</h2>
        <p className="signup-success-text">Your account has been created successfully.</p>
      </div>
    </div>
  );
}

  return (
    <div className="signup-container">
      <div className="signup-background">
        <div className="signup-form-card">
          <h2 className="signup-heading">
            {step === 1 ? 'Personal Information' : step === 2 ? 'Identification & Verification' : 'Account Security'}
          </h2>

          {progress > 0 && progress < 100 && step === 2 && (
            <div className="signup-progress-bar">
              <div className="signup-progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
          )}

          <div className="signup-form-grid">
            {step === 1 && (
              <>
                <div className="signup-form-field">
                  <label>First Name</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                </div>

                <div className="signup-form-field">
                  <label>Last Name</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                </div>

                <div className="signup-form-field">
                  <label>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                </div>

                <div className="signup-form-field">
                  <label>Date of Birth</label>
                  <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} />
                </div>

                <div className="signup-form-field">
                  <label>Phone Number</label>
                  <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
                </div>

                <div className="signup-form-field">
                  <label>Nationality</label>
                  <input type="text" name="nationality" value={formData.nationality} onChange={handleInputChange} />
                </div>

                <div className="signup-form-field">
                  <label>Address</label>
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
                </div>

                <div className="signup-form-field">
                <label>Gender</label>
                 <div className="signup-gender-buttons">
                  <button type="button" className={`signup-gender-button ${formData.gender === 'female' ? 'active' : ''}`} onClick={() => handleGenderChange('female')}>Female</button>
                 <button type="button" className={`signup-gender-button ${formData.gender === 'male' ? 'active' : ''}`} onClick={() => handleGenderChange('male')}>Male</button>
                 </div>
               </div>

                <div className="signup-form-emgfield">
                  <label>Emergency Contact No</label>
                  <input type="tel" name="emergencyContact" value={formData.emergencyContact} onChange={handleInputChange} />
                </div>
              </>
            )}

           {step === 2 && (
           <>
              <div className="signup-form-field">
                 <label>Government ID Type</label>
                  <select name="idType" value={formData.idType} onChange={handleInputChange}>
                    <option value="">Select ID Type</option>
                   <option value="passport">Passport</option>
                    <option value="driver_license">Driver's License</option>
                    <option value="national_id">National ID</option>
                    </select>
                   </div>

                    <div className="signup-form-field">
                    <label>ID Number</label>
                  <input type="text" name="idNumber" value={formData.idNumber} onChange={handleInputChange} />
                </div>

                   <div className="signup-form-field">
                   <label>Upload ID Document</label>
                  <input type="file" name="idDocument" accept="image/*,application/pdf" onChange={handleFileChange} />
                 </div>

                 <div className="signup-form-field">
                 <label>Selfie with ID for Verification</label>
                  <input type="file" name="selfieWithId" accept="image/*" onChange={handleFileChange} />
                  </div>
                </>
               )}


           {step === 3 && (
           <>
           <div className="signup-form-field">
            <label>Username</label>
              <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
            </div>

            <div className="signup-form-field">
             <label>Password</label>
             <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
              </div>

            <div className="signup-form-field">
             <label>Confirm Password</label>
             <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} />
            </div>

          <div className="signup-form-field">
            <label>Security Question</label>
               <input type="text" name="securityQuestion" value={formData.securityQuestion} onChange={handleInputChange} />
            </div>

             <div className="signup-form-field">
               <label>Security Answer</label>
               <input type="text" name="securityAnswer" value={formData.securityAnswer} onChange={handleInputChange} />
              </div>

             <div className="signup-form-field signup-full-width">
             <label className="checkbox-label">
              <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleInputChange} />
                 Agree to Terms & Privacy Policy
               </label>
                <label className="checkbox-label">
                <input type="checkbox" name="agreeDataPolicy" checked={formData.agreeDataPolicy} onChange={handleInputChange} />
                Agree to Data Processing & Storage
                </label>
              </div>
             </>
            )}

          </div>

          {validationError && <p className="signup-error">{validationError}</p>}

          <button className="signup-submit-btn" onClick={handleNext}>
            {step === 3 ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
