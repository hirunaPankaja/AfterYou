import React, { useState } from 'react';
import ProfileHeader from '../componenets/Header';
import Accounts from '../main-screens/AccountsPage';
import '../style/Home.css';
import ProfilePage from './ProfilePage';
import SubscriptionDashboard from './SubscriptionDashboard';

function Home() {
  const [activePage, setActivePage] = useState('home');

  const goToHome = (e) => {
    e.preventDefault();
    setActivePage('home');
  };

  const goToAccounts = (e) => {
    e.preventDefault();
    setActivePage('accounts');
  };

  const goToSubscription = (e) => {
    e.preventDefault();
    setActivePage('subscription');
  };

  const goToUser = (e) => {
    e.preventDefault();
    setActivePage('user');
  };

  let content;
  switch (activePage) {
    case 'accounts':
      content = <Accounts />;
      break;
    case 'subscription':
      content = <SubscriptionDashboard />;
      break;
    case 'user':
      content = <UserProfile />;
      break;
    default:
      content = <ProfilePage/>;
  }

  return (
    <div className="home-container">
      <ProfileHeader
        goToHome={goToHome}
        goToAccounts={goToAccounts}
        goToSubscription={goToSubscription}
        goToUser={goToUser}
      />
      <div className="content-container">
        {content}
      </div>
    </div>
  );
}

export default Home;
