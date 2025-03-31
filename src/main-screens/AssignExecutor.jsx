import React from 'react';
import './AssignExecutor.css';

const AssignExecutor = ({ title = "Assign Executor", warningText = "Transferring your digital accounts to someone else after you is a legal process. Therefore, please note that you can only enter the recipient's information after informing your lawyer first." }) => {
  const handleClick = (type) => {
    console.log(`Add ${type} clicked`);
  };

  return (
    <div className="assign-executor-container">
      <h1 className="title">{title}</h1>
      
      <div className="divider"></div>
      
      <p className="warning-text">
        {warningText}
      </p>

      <div className="options-container">
        <div className="option-card" onClick={() => handleClick('Lawyer')}>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z-o_IAz4-w8v6Rqr/icons-8-l.png" 
            alt="Lawyer icon" 
            className="option-icon"
          />
          <span className="option-text">Add Lawyer</span>
        </div>

        <div className="option-card" onClick={() => handleClick('Executor')}>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z-o_IAz4-w8v6Rqr/icons-8-m.png" 
            alt="Executor icon" 
            className="option-icon"
          />
          <span className="option-text">Add Executor</span>
        </div>
      </div>

      <div className="family-member-container">
        <div className="option-card" onClick={() => handleClick('Family member')}>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z-o_IAz4-w8v6Rqr/icons-8-m-2.png" 
            alt="Family member icon" 
            className="option-icon"
          />
          <span className="option-text">Add Family member</span>
        </div>
      </div>
    </div>
  );
};

export default AssignExecutor;

