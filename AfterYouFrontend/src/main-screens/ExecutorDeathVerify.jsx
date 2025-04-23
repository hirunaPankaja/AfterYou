import React, { useState } from "react";
import "../Style/DeathCertificateUpload.css"; // Adjust the path as necessary

const DeathCertificateUpload = () => {
  const [form, setForm] = useState({
    name: "",
    date: "",
    file: null,
  });
  const [status, setStatus] = useState("Pending");
  const [processingTime] = useState("48 hrs");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    // setStatus('Pending'); // Simulate status update if needed
  };

  return (
    <div className="container">
      <div className="panel left-panel">
        <h2>Upload Death Certificate</h2>
        <form onSubmit={handleSubmit}>
          <label>Full Name of deceased</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <label>Date of death</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />

          <label>Upload Death Certificate</label>
          <div className="file-upload">
            <input
              type="file"
              name="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleChange}
            />
            <span className="camera-icon">&#128247;</span>
          </div>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
      <div className="panel right-panel">
        <h2>Waiting For Legal Approval</h2>
        <p>Your request is under review by our legal team.</p>
        <div className="status-row">
          <span>Status</span>
          <span className="status-indicator">
            <span className="dot"></span> Pending
          </span>
        </div>
        <div className="status-row">
          <span>Expected Processing Time</span>
          <input
            type="text"
            value={processingTime}
            readOnly
            className="processing-time"
          />
        </div>
      </div>
      <button className="done-btn">Done</button>
    </div>
  );
};

export default DeathCertificateUpload;
