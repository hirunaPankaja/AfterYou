import React, { useState, useEffect } from "react";
import { uploadDeathCertificate, verifyDeathCertificate, verified } from "../Services/DeathCertificateService.js";
import "../Style/DeathCertificateUpload.css"; // Adjust the path as necessary

const DeathCertificateUpload = () => {
  const [form, setForm] = useState({
    name: "",
    date: "",
    file: null,
  });

  const [status, setStatus] = useState("Pending");
  const [certId, setCertId] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [processingTime] = useState("48 hrs");

  const executorId = localStorage.getItem("executorId");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("deceasedName", form.name);
    formData.append("deceasedDate", form.date);
    formData.append("deathCertificate", form.file);
    formData.append("executorId", executorId);

    try {
      // Upload Death Certificate
      const uploadResponse = await uploadDeathCertificate(formData);

      // Get certId from the response
      if (uploadResponse.data.certId) {
        setCertId(uploadResponse.data.certId);
        setStatus("Waiting for approval...");
        alert("Your death certificate is uploaded. Waiting for legal approval.");
        
        // Start polling for verification
        checkVerification(uploadResponse.data.certId);
      } else {
        alert("Failed to upload certificate.");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Submission failed.");
    }
  };

  const checkVerification = async (certId) => {
    try {
      const verifiedRes = await verified(executorId);
      if (verifiedRes === "yes") {
        setStatus("Approved");
        setIsVerified(true);
      } else {
        setStatus("Pending");
        setIsVerified(false);
      }
    } catch (err) {
      console.error("Verification check failed:", err);
      setStatus("Error occurred while checking verification.");
    }
  };

  useEffect(() => {
    if (certId) {
      const interval = setInterval(() => {
        checkVerification(certId); // Check verification every 10 seconds
      }, 10000); // 10 seconds interval
      return () => clearInterval(interval); // Cleanup on component unmount
    }
  }, [certId]);

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
            required
          />

          <label>Date of death</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />

          <label>Upload Death Certificate</label>
          <div className="file-upload">
            <input
              type="file"
              name="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleChange}
              required
            />
            <span className="camera-icon">&#128247;</span>
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>

      <div className="panel right-panel">
        <h2>{status === "Approved" ? "Approved by Legal Team" : "Waiting For Legal Approval"}</h2>
        <p>
          {status === "Approved"
            ? "The death certificate has been officially approved."
            : "Your request is under review by our legal team."}
        </p>

        <div className="status-row">
          <span>Status</span>
          <span className={`status-indicator ${status.toLowerCase()}`}>
            <span className={`dot ${status.toLowerCase()}`}></span> {status}
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

      <button className="done-btn" disabled={!isVerified}>Done</button>
    </div>
  );
};

export default DeathCertificateUpload;
