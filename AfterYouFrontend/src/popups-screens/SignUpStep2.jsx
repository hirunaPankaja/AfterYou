import React, { useState } from 'react';
import { validateIdentityImages } from '../Services/validation';
import AccountSecurityForm from './SignUpStep3';
import '../style/SignUpStep2.css'; // Assuming you have a CSS file for styles

const IDVerificationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    idType: '',
    idNumber: '',
    idDocument: null,
    selfieWithId: null,
  });
  const [validationError, setValidationError] = useState('');
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: files[0] }));
  };

  const onNext = () => {
    setStep(2);
  };

  const handleNext = async () => {
    setValidationError('');
    setProgress(0);

    if (!formData.idType || !formData.idNumber || !formData.idDocument || !formData.selfieWithId) {
      setValidationError('All fields and files are required.');
      return;
    }

    const error = await validateIdentityImages(
      formData.idNumber,
      formData.idDocument,
      formData.selfieWithId,
      setProgress // 🔁 pass to update progress bar
    );

    if (error) {
      setValidationError(error);
      return;
    }

    onNext(); // ✅ Go to next step
  };

  if (step === 2) {
    return <AccountSecurityForm onSubmit={(data) => console.log('Final Submit:', data)} />;
  }

  return (
    <div className="idv-main-wrapper">
      <div className="idv-background">
        <div className="idv-card">
          <h2 className="idv-title">Identification & Verification</h2>

          {progress > 0 && progress < 100 && (
            <div className="idv-progress-bar">
              <div className="idv-progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
          )}

          <div className="idv-form">
            <div className="idv-form-group">
              <label>Government ID Type</label>
              <select name="idType" value={formData.idType} onChange={handleChange}>
                <option value="">Select ID Type</option>
                <option value="passport">Passport</option>
                <option value="driver_license">Driver's License</option>
                <option value="national_id">National ID</option>
              </select>
            </div>

            <div className="idv-form-group">
              <label>ID Number</label>
              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
              />
            </div>

            <div className="idv-form-group">
              <label>Upload ID Document</label>
              <input
                type="file"
                name="idDocument"
                accept="image/*,application/pdf"
                onChange={handleFileChange}
              />
            </div>

            <div className="idv-form-group">
              <label>Selfie with ID for Verification</label>
              <input
                type="file"
                name="selfieWithId"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {validationError && (
            <p className="idv-error">{validationError}</p>
          )}

          <button className="idv-next-button" onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default IDVerificationForm;
