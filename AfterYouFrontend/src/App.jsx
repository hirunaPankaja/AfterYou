import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Executor from './main-screens/Executor'; 
import './App.css';
import DeathCertificateUpload from './main-screens/DeathCertificateUpload';
import LandingPage from './main-screens/LandingPage';
import Home from './main-screens/Home';
import SignUpForm from './popups-screens/SignUpForm';
import Login from './popups-screens/Login';
import PrivacyPolicy from './componenets/PrivacyPolicy';
import ProfilePage from './main-screens/ProfilePage';
import AccountsPage from './main-screens/AccountsPage';
import Executor from './main-screens/Executor';
import ExecutorUploadDeathCertificate from './main-screens/ExecutorDeathVerify';
import LastWillStepper from './main-screens/LastWillStepper';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} /> {/*User dashbjjoard*/}
        <Route path="/signup" element={<SignUpForm />} />{/*User signup*/ }
        <Route path="/privacy-policy" element={<PrivacyPolicy/>} />{/*Privacy policyuhuxhuehd page */}
        <Route path="/login" element={<Login/>} />{/*User login*/}
        <Route path="/profile" element={<ProfilePage />} />{/*User home */}
        <Route path="/accounts" element={<AccountsPage />} />{/*User account page */}
        <Route path="/executors" element={<ProfilePage />} />     {/*executor */}
        <Route path="/user" element={<ProfilePage />} /> {/*user dashboard */}
        <Route path="/subscription" element={<ProfilePage />} /> {/*user dashboard */}
        <Route path="/executor" element={<Executor />} />{/*m222jijijjij2n*/}
        <Route path="/VerifyDeathCertificate" element={<ExecutorUploadDeathCertificate />} />{/*m222jijijjij2n*/}
        <Route path="/LastWillStepper" element={<LastWillStepper />} />{/*m2ij2n*/}


      </Routes>
    </Router>
  );
}

export default App;
