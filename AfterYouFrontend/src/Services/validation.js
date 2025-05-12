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

  
export async function validateIdentityImages(idNumber, idDoc, selfie, setProgress) {
  // Use setProgress safely
  if (setProgress) setProgress(10);

  const result1 = await Tesseract.recognize(idDoc, 'eng', {
    logger: m => {
      if (setProgress) setProgress(m.progress * 50); // Just an example
      console.log(m);
    },
  });

  const result2 = await Tesseract.recognize(selfie, 'eng', {
    logger: m => {
      if (setProgress) setProgress(50 + m.progress * 50); // Continue from 50 to 100
      console.log(m);
    },
  });

  const idText = result1.data.text;
  const selfieText = result2.data.text;

  console.log("ID Document Text:", idText);
  console.log("Selfie Text:", selfieText);

  if (!idText.includes(idNumber) || !selfieText.includes(idNumber)) {
    return 'ID number not clearly visible in both images.';
  }

  return null;
}

export async function validateLawyerId(LidDoc, LidNumber, setProgress) {
  // Use setProgress safely
  if (setProgress) setProgress(10);

  const result1 = await Tesseract.recognize(LidDoc, 'eng', {
    logger: m => {
      if (setProgress) setProgress(m.progress * 50); // Just an example
      console.log(m);
    },
  });

  const idText = result1.data.text;

  console.log("ID Document Text:", idText);

  if (!idText.includes(LidNumber)) {
    return 'ID number not clearly visible in both images.';
  }

  return null;
}