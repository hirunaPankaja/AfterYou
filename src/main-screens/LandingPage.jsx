import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import '../style/LandingPage.css';

const LandingPage = ({ title1 = 'After', title2 = 'You', imageUrl = 'https://dashboard.codeparrot.ai/api/image/Z-ERUf8PKu40N2NK/17427977.png' }) => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleSignUp = () => {
    navigate('/signup'); // Navigate to the SignUp page when the button is clicked
  };

  const handleSignIn = () => {
    navigate('/home');
  };

  return (
    <div className="container">
      <div className="textContainer">
        <div className="afterText">{title1}</div>
        <div className="youText">{title2}</div>
      </div>
      
      <div className="buttonContainer">
        <button 
          className="button"
          onClick={handleSignUp} // Use the handleSignUp function to navigate
        >
          Sign Up
        </button>
        <button 
          className="button"
          onClick={handleSignIn}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
