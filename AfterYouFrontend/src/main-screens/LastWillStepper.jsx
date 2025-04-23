import React from "react";
import "../Style/LastWillStepper.css";

const steps = [
  "Verify Executor details",
  "Verify Death certification",
  "Waiting for Lawyer or another assigned person acceptence",
  "Start to Execute Last Will",
  "Complete",
];

const LastWillStepper = () => (
  <div className="lw-container">
    <h1 className="lw-title">Executing Last Will</h1>
    <div className="lw-stepper-row">
      <div className="lw-stepper">
        {steps.map((_, idx) => (
          <div key={idx} className="lw-stepper-item">
            <div className="lw-stepper-circle" />
            {idx < steps.length - 1 && <div className="lw-stepper-line" />}
          </div>
        ))}
      </div>
      <div className="lw-steps-list">
        {steps.map((label, idx) => (
          <div className="lw-step-row" key={idx}>
            <span className="lw-step-label">{label}</span>
            <span className="lw-check">&#10003;</span>
          </div>
        ))}
      </div>
    </div>
    <button className="lw-done-btn">Done</button>
  </div>
);

export default LastWillStepper;
