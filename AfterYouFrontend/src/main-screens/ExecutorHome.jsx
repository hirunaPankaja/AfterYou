import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons"; 
import { faDownload } from "@fortawesome/free-solid-svg-icons"; // Download icon
import "../style/ExecutorHome.css";

const linkedAccounts = [
    { name: "Facebook", icon: faFacebook, profile: "Shey Silva" },
    { name: "Twitter", icon: faTwitter, profile: "Shey Silva" },
    { name: "GitHub", icon: faGithub, profile: "Shey Silva" },
    { name: "Gmail", icon: faGoogle, profile: "Shey Silva" }
];

const ExecutorHome = ({ userName = "Max" }) => {
  const navigate = useNavigate();

  return (
    <div className="executor-home">
      <header className="executor-header">
        <img src="https://dashboard.codeparrot.ai/api/image/Z-pCHwz4-w8v6RrF/logo.png" alt="Logo" className="executor-logo" />
      </header>

      <main className="executor-content">
        <div className="executor-welcome-section">
          <h2 className="executor-welcome-heading">Welcome, {userName}</h2>
          <p className="executor-description">Manage and execute assigned wills securely and efficiently.</p>
        </div>

        <hr className="executor-solid-divider" /> {/* Solid line divider */}

        <h2 className="executor-accounts-heading">Accounts</h2>
        <div className="executor-account-list">
          {linkedAccounts.map((account, index) => (
            <div className="executor-account-card" key={index}>
              <FontAwesomeIcon className={`executor-account-icon ${account.name.toLowerCase()}`} icon={account.icon} size="2x" />
              <div className="executor-account-details">
                <h3>{account.name}</h3>
                <p>Profile | {account.profile}</p>
              </div>
              {/* Just Download Icon, No Click Action */}
              <FontAwesomeIcon className="executor-download-icon" icon={faDownload} size="2x" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ExecutorHome;
