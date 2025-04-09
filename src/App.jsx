import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './main-screens/LandingPage';
import Home from './main-screens/Home';
import SignUpForm from './main-screens/SignUpForm';
import PrivacyPolicy from './componenets/PrivacyPolicy';
import Login from './main-screens/Login';
import ProfilePage from './main-screens/ProfilePage';
import AccountsPage from './main-screens/AccountsPage';
import Executor from './main-screens/Executor';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} /> {/*User dashboard*/}
        <Route path="/signup" element={<SignUpForm />} />{/*User signup*/ }
        <Route path="/privacy-policy" element={<PrivacyPolicy/>} />{/*Privacy policy page */}
        <Route path="/login" element={<Login/>} />{/*User login*/}
        <Route path="/profile" element={<ProfilePage />} />{/*User home */}
        <Route path="/accounts" element={<AccountsPage />} />
        <Route path="/executors" element={<ProfilePage />} />     
        <Route path="/user" element={<ProfilePage />} />
        <Route path="/subscription" element={<ProfilePage />} />
        <Route path="/executor" element={<Executor />} />
      </Routes>
    </Router>
  );
}

export default App;
