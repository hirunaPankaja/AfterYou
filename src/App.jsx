import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './main-screens/LandingPage';
import Home from './main-screens/Home';
import SignUpForm from './main-screens/SignUpForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUpForm />} /> {/* Add a route for the SignUp page */}
      </Routes>
    </Router>
  );
}

export default App;
