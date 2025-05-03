
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Executor from './main-screens/Executor'; 
import './App.css';
import DeathCertificateUpload from './main-screens/DeathCertificateUpload';
import LandingPage from './main-screens/LandingPage';
import Home from './main-screens/Home';
import SignUpStep1 from './popups-screens/SignUpStep1.jsx';
import Login from './popups-screens/Login';
import PrivacyPolicy from './components/PrivacyPolicy';
import ProfilePage from './main-screens/ProfilePage';
import AccountsPage from './main-screens/AccountsPage';
import AssignExecutor from "./main-screens/AssignExecutor.jsx";
import AssignLawyer from "./popups-screens/AssignLawyer.jsx";
import AssignExecutorForm from "./main-screens/AssignExecutorForm.jsx";
import ExecutorUploadDeathCertificate from './main-screens/ExecutorDeathVerify';
import LastWillStepper from './main-screens/LastWillStepper';
import AccountForm from './popups-screens/AddAccount.jsx';
import ExecutorForm from './popups-screens/AddSubscription.jsx';
import ExecutorExecutingProcess from './main-screens/ExecutorExecutingProcess';
import './App.css';


function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} /> {/*User dashbjjoard*/}
        <Route path="/signup" element={<SignUpStep1 />} />{/*User signup*/ }
        <Route path="/privacy-policy" element={<PrivacyPolicy/>} />{/*Privacy policyuhuxhuehd page */}
        <Route path="/login" element={<Login/>} />{/*User login*/}
        <Route path="/profile" element={<ProfilePage />} />{/*User home */}
        <Route path="/accounts" element={<AccountsPage />} />{/*User account page */}
        <Route path="/executors" element={<AssignExecutor />} />     {/*executor */}
        <Route path="/assign-lawyer" element={<AssignLawyer />} />
        <Route path="/assign-executor" element={<AssignExecutorForm />} />
        <Route path="/user" element={<ProfilePage />} /> {/*user dashboard */}
        <Route path="/subscription" element={<ProfilePage />} /> {/*user dashboard */}
        <Route path="/executor" element={<Executor />} />{/*m222jijijjij2n*/}
        <Route path="/VerifyDeathCertificate" element={<ExecutorUploadDeathCertificate />} />{/*m222jijijjij2n*/}
        <Route path="/LastWillStepper" element={<LastWillStepper />} />{/*m2ij2n*/}
        <Route path="/accountform" element={<AccountForm />} />{/*m222jijijjij2n*/}
        <Route path="/subscriptionForm" element={<ExecutorForm />} />{/*m222jijijjij2n*/}
        <Route path="/" element={<Executor />} /> {/* Set Executor as default page */}
        <Route path="/executors" element={<Executor />} />
        <Route path="/deathcertificateupload" element={<DeathCertificateUpload />} /> {/* Corrected spelling */}
        <Route path="/executorExecutingProcess" element={<ExecutorExecutingProcess />} />
        <Route path="*" element={<div>Page Not Found</div>} /> {/* Fallback for undefined routes */}
      </Routes>
    </Router>
  );
}

export default App;

