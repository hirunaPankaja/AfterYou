import React, { useState } from "react";
import "../style/LawyerRegister.css"; // Ensure you have the correct CSS file

const LawyerRegister = () => {
  const [formData, setFormData] = useState({
    lawyerName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="lawyer-register-container">
      <h2 className="form-title">Lawyer Register</h2>
      <form className="lawyer-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label">Lawyer Name</label>
          <input
            type="text"
            name="lawyerName"
            value={formData.lawyerName}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter your name"
            required
          />
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default LawyerRegister;
