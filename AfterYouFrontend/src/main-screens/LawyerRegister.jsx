import React, { useState } from "react";
import "../style/LawyerRegister.css"; 


const LawyerRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    nationalId: '',
    lawyerId: '',
    identityProof: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
  };

  return (
    <div className="form-container">
      <h2>Lawyer Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Lawyer Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Lawyer Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Lawyer Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Lawyer Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Lawyer Contact</label>
          <input
            type="tel"
            name="contact"
            placeholder="Enter Contact Number"
            value={formData.contact}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>National ID</label>
          <input
            type="text"
            name="nationalId"
            placeholder="Enter National ID"
            value={formData.nationalId}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Lawyer ID</label>
          <input
            type="text"
            name="lawyerId"
            placeholder="Enter Lawyer ID"
            value={formData.lawyerId}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Lawyer Identity Proof Upload</label>
          <input
            type="file"
            name="identityProof"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LawyerRegister;
