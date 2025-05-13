import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SiDiscord, SiNetflix } from 'react-icons/si'; // Only Discord & Netflix from simple-icons

import {
  faFacebook,
  faTwitter,
  faInstagram,
  faGoogle,
  faTelegram,
  faGithub,
  faLinkedin,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons'; // FontAwesome brand icons

import {
  faTrash,
} from '@fortawesome/free-solid-svg-icons'; // FontAwesome solid icons

import '../style/AccountCard.css';

function AccountCard({ accountCard, onDelete }) {
  const platformIcons = {
    Facebook: { icon: faFacebook, color: '#1877F2', type: 'fa' },
    Twitter: { icon: faTwitter, color: '#1DA1F2', type: 'fa' },
    Instagram: { icon: faInstagram, color: '#C13584', type: 'fa' },
    Gmail: { icon: faGoogle, color: '#DB4437', type: 'fa' },
    Telegram: { icon: faTelegram, color: '#0088CC', type: 'fa' },
    Whatsapp: { icon: faWhatsapp, color: '#25D366', type: 'fa' },
    Discord: { icon: SiDiscord, color: '#7289DA', type: 'si' },
    Netflix: { icon: SiNetflix, color: '#E50914', type: 'si' },
    Github: { icon: faGithub, color: '#333', type: 'fa' },
    LinkedIn: { icon: faLinkedin, color: '#0077B5', type: 'fa' }, // Placeholder for LinkedIn
  };

  const { icon, color, type } = platformIcons[accountCard.platform] || {};

  return (
    <div className="account-card">
      <div className="account-header">
        {/* ✅ Clickable Social Media Icon */}
        {accountCard.profileUrl && (
          <a href={accountCard.profileUrl} target="_blank" rel="noopener noreferrer">
            {type === 'fa' && icon && (
              <FontAwesomeIcon icon={icon} className="platform-icon" style={{ color }} />
            )}
            {type === 'si' && icon && (
              React.createElement(icon, { className: 'platform-icon', style: { color } })
            )}
          </a>
        )}
        <span className="platform-name">{accountCard.platform}</span>
      </div>

      {/* Vertical divider */}
      <div className="vertical-divider"></div>

      <div className="account-body">
        <p><strong>User:</strong> {accountCard.username}</p>
        <p><strong>Action:</strong> {accountCard.actionType}</p>
      </div>

      <div className="account-actions">
        <button className="action-button delete-btn" onClick={() => onDelete(accountCard.id)}>
          <FontAwesomeIcon icon={faTrash} />
          <span className="tooltip">Delete</span>
        </button>
      </div>
    </div>
  );
}

export default AccountCard;
