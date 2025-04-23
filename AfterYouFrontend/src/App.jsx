import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Executor from './main-screens/Executor'; 
import './App.css';
import DeathCertificateUpload from './main-screens/DeathCertificateUpload';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Executor />} /> {/* Default route */}
        <Route path="/executors" element={<Executor />} />
        <Route path="/deathdertificateupload" element={<DeathCertificateUpload />} />
      </Routes>
    </Router>
  );
}

export default App;
