import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faGoogle,
} from '@fortawesome/free-brands-svg-icons';

function AccountCard({ accountCard, platform, onClick }) {
  const platformIcons = {
    Facebook: faFacebook,
    Twitter: faTwitter,
    Instagram: faInstagram,
    Gmail: faGoogle, // ✅ Use faGoogle instead of faGmail
  };

  return (
    <div className="account-card" onClick={onClick}>
      <h3>
        <FontAwesomeIcon
          icon={platformIcons[platform]}
          style={{ marginRight: '8px' }}
        />
        {platform}
      </h3>
      <p>Profile: {accountCard.name}</p>
      <p>Action: {accountCard.action}</p>
    </div>
  );
}

export default AccountCard;
