import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../style/ExecutorExecutingProcess.css';

const ExecutorExecutingProcess = () => {
  const navigate = useNavigate(); // Initialize navigation function

  const handleDoneClick = () => {
    navigate('/executor-home'); // Redirect to Executor Home page
  };

  return (
    <div className="process-container">
      <h1 className="process-title">Executing Last Will</h1>
      <div className="steps-wrapper">
        <div className="process-step">
          <div className="step-line">
            <div className="step-circle"></div>
          </div>
          <span className="step-description">Verify Executor details</span>
          <span className="step-check"><div className="check-circle">✔</div></span>
        </div>
        <div className="process-step">
          <div className="step-line">
            <div className="step-circle"></div>
          </div>
          <span className="step-description">Verify Death certification</span>
          <span className="step-check"><div className="check-circle">✔</div></span>
        </div>
        <div className="process-step">
          <div className="step-line">
            <div className="step-circle"></div>
          </div>
          <span className="step-description">Waiting for Lawyer or another assigned person acceptance</span>
          <span className="step-check"><div className="check-circle">✔</div></span>
        </div>
        <div className="process-step">
          <div className="step-line">
            <div className="step-circle"></div>
          </div>
          <span className="step-description">Start to Execute Last Will</span>
          <span className="step-check"><div className="check-circle">✔</div></span>
        </div>
        <div className="process-step">
          <div className="step-line">
            <div className="step-circle"></div>
          </div>
          <span className="step-description">Complete</span>
          <span className="step-check"><div className="check-circle">✔</div></span>
        </div>
      </div>
      <button className="complete-button" onClick={handleDoneClick}>Done</button> {/* Added onClick event */}
    </div>
  );
};

export default ExecutorExecutingProcess;
