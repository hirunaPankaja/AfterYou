import React from 'react';

function AccountCard({ platform }) {
  const platformIcons = {
    Facebook: '📘',
    Twitter: '🐦',
    Instagram: '📸',
    Gmail: '📧',
    // Add more as needed
  };

  return (
    <div className="account-card">
      <h3>{platformIcons[platform]} {platform}</h3>
      <p>Profile: {platform}User</p>
      <p>Action: Gmail Connected</p>
    </div>
  );
}

export default AccountCard;
