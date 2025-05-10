import Tesseract from 'tesseract.js';

export const validatePassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      return 'Passwords do not match!';
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters long!';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter!';
    }
    return null;  // No validation error
  };
  
  export const validateAgreement = (agreeTerms, agreeDataPolicy) => {
    if (!agreeTerms || !agreeDataPolicy) {
      return 'You must agree to the Terms and Privacy Policy and Data Processing & Storage.';
    }
    return null;
  };

  export const validateEmail = (email) => {
    // Simple email regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!email) {
      return "Email is required!";
    }
  
    if (!emailPattern.test(email)) {
      return "Invalid email format!";
    }
  
    return null; // Valid email
  };
  
  export const validatePhoneNumber = (emergencyContact, phoneNumber) => {
    const phonePattern = /^\d{10}$/;
  
    if (!phoneNumber) {
      return "Phone number is required!";
    }
  
    if (!phonePattern.test(phoneNumber)) {
      return "Phone number must be exactly 10 digits!";
    }
  
    if (!emergencyContact) {
      return "Emergency contact number is required!";
    }
  
    if (!phonePattern.test(emergencyContact)) {
      return "Emergency contact number must be exactly 10 digits!";
    }
  
    if (phoneNumber === emergencyContact) {
      return "Phone number and emergency contact cannot be the same!";
    }
  
    return null; // Valid phone numbers
  };

  export const validateIdentityImages = async (idNumber, idDocument, selfieWithId) => {
    const extractText = (image) => {
      return new Promise((resolve, reject) => {
        Tesseract.recognize(
          image,
          'eng', // You can specify other languages as needed
          {
            logger: (m) => console.log(m), // Optional: for tracking the progress
          }
        ).then(({ data: { text } }) => resolve(text)).catch(reject);
      });
    };
  
    // Extract text from the ID document and selfie images
    const idDocumentText = await extractText(idDocument);
    const selfieWithIdText = await extractText(selfieWithId);
  
    // Validate if the ID number appears in both images
    const isIdNumberInImages = idDocumentText.includes(idNumber) && selfieWithIdText.includes(idNumber);
    
    if (!isIdNumberInImages) {
      return 'The ID number in the images does not match the entered ID number or is not present in the images.';
    }
  
    return null; // No error
  };