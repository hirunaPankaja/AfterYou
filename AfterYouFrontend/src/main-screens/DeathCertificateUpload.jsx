import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  uploadDeathCertificate,
  verified,
} from "../Services/DeathCertificateService.js";
import "../Style/DeathCertificateUpload.css";

const DeathCertificateUpload = () => {
  const [form, setForm] = useState({
    name: "",
    date: "",
    file: null,
  });

  const [status, setStatus] = useState(localStorage.getItem("status") || "Not Submitted");
  const [certId, setCertId] = useState(localStorage.getItem("certId") || null);
  const [isVerified, setIsVerified] = useState(
    localStorage.getItem("isVerified") === "true"
  );
  const [processingTime] = useState("48 hrs");
  const [loading, setLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const navigate = useNavigate();
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
    setLoading(true);
    console.log("Submitting form...");

    const formData = new FormData();
    formData.append("deceasedName", form.name);
    formData.append("deceasedDate", form.date);
    formData.append("deathCertificate", form.file);
    formData.append("executorId", executorId);

    try {
      const uploadResponse = await uploadDeathCertificate(formData);
      const id = uploadResponse.data.certId;
      console.log("Upload response:", uploadResponse);

      if (id) {
        setCertId(id);
        localStorage.setItem("certId", id);
        setStatus("Pending");
        localStorage.setItem("status", "Pending");
        setShowOverlay(true);
      } else {
        alert("Upload succeeded but no certId returned.");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const checkVerification = async () => {
    console.log("Checking verification for executorId:", executorId);
    try {
      const verifiedRes = await verified(executorId);
      console.log("Verification response:", verifiedRes);

      if (verifiedRes === "yes") {
        setStatus("Approved");
        setIsVerified(true);
        localStorage.setItem("status", "Approved");
        localStorage.setItem("isVerified", "true");
        clearCertId();
      } else {
        setStatus("Pending");
        setIsVerified(false);
        localStorage.setItem("status", "Pending");
        localStorage.setItem("isVerified", "false");
      }
    } catch (err) {
      console.error("Verification check failed:", err);
      setStatus("Error");
      localStorage.setItem("status", "Error");
    }
  };

  const clearCertId = () => {
    localStorage.removeItem("certId");
    setCertId(null);
  };

  useEffect(() => {
    console.log("Component loaded. Current certId:", certId);
    checkVerification();

    if (certId) {
      const interval = setInterval(() => {
        console.log("Polling verification...");
        checkVerification();
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [certId]);

  const goToExecutorExecutingProcess = () => {
    console.log("Navigating to /executorExecutingProcess...");
    navigate("/executorExecutingProcess");
  };

  return (
    <div className="container">
      <div className="panel left-panel">
        <h2>Upload Death Certificate</h2>
        <form onSubmit={handleSubmit}>
          <label>Full Name of Deceased</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            disabled={isVerified || loading}
          />

          <label>Date of Death</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            disabled={isVerified || loading}
          />

          <label>Upload Death Certificate</label>
          <div className="file-upload">
            <input
              type="file"
              name="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleChange}
              required
              disabled={isVerified || loading}
            />
            <span className="camera-icon">&#128247;</span>
          </div>

          <button type="submit" className="submit-btn" disabled={isVerified || loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

      <div className="panel right-panel">
        <h2>
          {status === "Approved"
            ? "Approved by Legal Team"
            : status === "Pending"
            ? "Waiting for Legal Approval"
            : "Submit a Certificate"}
        </h2>
        <p>
          {status === "Approved"
            ? "The death certificate has been approved."
            : status === "Pending"
            ? "Your request is under legal review."
            : "Please submit a death certificate for processing."}
        </p>

        {certId && (
          <>
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
          </>
        )}
      </div>

      <button
        className="done-btn"
        disabled={!isVerified}
        onClick={goToExecutorExecutingProcess}
      >
        Done
      </button>

      {/* Overlay Modal */}
      {showOverlay && (
        <div className="overlay">
          <div className="modal">
            <h3>Submission Successful</h3>
            <p>Your certificate has been submitted. Please wait for legal approval.</p>
            <button onClick={() => setShowOverlay(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeathCertificateUpload;
 