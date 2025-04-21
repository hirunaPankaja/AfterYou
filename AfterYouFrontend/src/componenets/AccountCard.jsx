import React from 'react';

function AccountCard({ platform }) {
  const platformIcons = {
    Facebook: '📘',
    Twitter: '🐦',
    Instagram: '📸',
    Gmail: '📧',
    
  };
// check wowkihugyftdrcd41414144
  return (
    <div className="account-card">
      <h3>{platformIcons[platform]} {platform}</h3>
      console.log("This is a test change");

      <p>Profile: {platform}User</p>
      <p>Action: Gmail Connected</p>
    </div>
  );
}

export default AccountCard;
