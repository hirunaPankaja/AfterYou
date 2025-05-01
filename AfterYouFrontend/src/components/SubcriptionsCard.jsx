import React from 'react';

function SubsriptionsCard({ platform ,subscriptionType}) {
  const platformIcons = {
    Facebook: '📘',
    Twitter: '🐦',
    Instagram: '📸',
    Gmail: '📧',
    
  };

  return (
    <div className="subscription-card">
      <h3>{platformIcons[platform]} {platform}</h3>

      <p>Profile: {platform}User</p>
      <p>Subscription Plan: {subsriptionType} </p>
    </div>
  );
}

export default SubsriptionsCard;
