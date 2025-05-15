import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/ExecutorExecutingProcess.css';

const steps = [
  'Verify Executor details',
  'Verify Death certification',
  'Waiting for Lawyer or assigned person acceptance',
  'Start to Execute Last Will',
  'Complete',
];

const ExecutorExecutingProcess = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(-1);
  const [doneEnabled, setDoneEnabled] = useState(false);

  useEffect(() => {
    if (currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 900);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setDoneEnabled(true), 1000);
    }
  }, [currentStep]);

  const handleDoneClick = () => {
    if (doneEnabled) {
      navigate('/executor-home');
    }
  };

  return (
    <div className="modern-process-container">
      <h2 className="modern-process-title">Executing Last Will</h2>
      <div className="modern-steps-wrapper">
        {steps.map((step, index) => (
          <div key={index} className="modern-step">
            <div className="circle-line-wrapper">
              <div
                className={`modern-step-circle ${
                  index <= currentStep ? 'active' : ''
                }`}
              >
                {index <= currentStep ? '✔' : ''}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`step-connector ${
                    index < currentStep ? 'filled' : ''
                  }`}
                ></div>
              )}
            </div>
            <span
              className={`modern-step-text ${
                index <= currentStep ? 'text-active' : ''
              }`}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
      <button
        className="modern-complete-button"
        onClick={handleDoneClick}
        disabled={!doneEnabled}
        style={{ opacity: doneEnabled ? 1 : 0.6 }}
      >
        Done
      </button>
    </div>
  );
};

export default ExecutorExecutingProcess;
