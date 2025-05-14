import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SiDiscord, SiNetflix } from 'react-icons/si'; // Only Discord & Netflix from simple-icons
import { deleteSubscription } from '../Services/userAccountService'; // ✅ Import delete function

import {
  faFacebook,
  faTwitter,
  faInstagram,
  faGoogle,
  faTelegram,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons'; // ✅ Brand icons

import {
  faTrash,
  faQuestionCircle, // ✅ Correct import from solid icons
} from '@fortawesome/free-solid-svg-icons'; // ✅ Solid icons

import '../style/AccountCard.css';

function SubscriptionsCard({ subscriptionAccountCard, platform, onDelete }) {
  const platformIcons = {
    Facebook: { icon: faFacebook, color: '#1877F2', type: 'fa' },
    Twitter: { icon: faTwitter, color: '#1DA1F2', type: 'fa' },
    Instagram: { icon: faInstagram, color: '#C13584', type: 'fa' },
    Gmail: { icon: faGoogle, color: '#DB4437', type: 'fa' },
    Telegram: { icon: faTelegram, color: '#0088CC', type: 'fa' },
    Whatsapp: { icon: faWhatsapp, color: '#25D366', type: 'fa' },
    Discord: { icon: SiDiscord, color: '#7289DA', type: 'si' },
    Netflix: { icon: SiNetflix, color: '#E50914', type: 'si' },
  };

  // ✅ Use fallback icon if platform is not recognized
  const { icon, color, type } = platformIcons[platform] || { icon: faQuestionCircle, color: '#888', type: 'fa' };

const handleDelete = async () => {
  try {
    console.log("Attempting to delete subscription:", subscriptionAccountCard); // ✅ Debugging log

    if (!subscriptionAccountCard.subscriptionId) {
      console.error("Error: Subscription ID is missing.");
      return;
    }

    await deleteSubscription(subscriptionAccountCard.subscriptionId); // ✅ Call API to delete subscription
    onDelete(subscriptionAccountCard.subscriptionId); // ✅ Update UI after deletion
  } catch (error) {
    console.error("Error deleting subscription:", error);
  }
};


  return (
    <div className="account-card">
      <div className="account-header">
        {type === 'fa' && icon && (
          <FontAwesomeIcon icon={icon} className="platform-icon" style={{ color }} />
        )}
        {type === 'si' && icon && (
          React.createElement(icon, { className: 'platform-icon', style: { color } })
        )}
        <span className="platform-name">{platform}</span>
      </div>

      {/* Vertical divider */}
      <div className="verticle-divider"></div>

      <div className="account-body">
        <p><strong>User:</strong> {subscriptionAccountCard.userName || "Unknown User"}</p> {/* ✅ Show user name */}
        <p><strong>Platform:</strong> {platform}</p> {/* ✅ Show platform */}
        <p><strong>Subscription Plan:</strong> {subscriptionAccountCard.type || "Unknown Plan"}</p> {/* ✅ Show subscription plan */}
      </div>

      <div className="account-actions">
        <button className="action-button delete-btn" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} />
          <span className="tooltip">Delete</span>
        </button>
      </div>
    </div>
  );
}

export default SubscriptionsCard;
