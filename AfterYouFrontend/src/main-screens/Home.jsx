import React, { useState } from 'react';
import ProfileHeader from '../components/Header';
import Accounts from '../main-screens/AccountsPage';
import ProfilePage from './ProfilePage';
import SubscriptionDashboard from './SubscriptionDashboard';
import '../style/Home.css';

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
    setActivePage('profile');
  };

  // Function to refresh the current page content
  const refreshPage = () => {
    // You can implement specific refresh logic here
    console.log(`Refreshing ${activePage} page content`);
    // For example, you could re-fetch data for the current page
  };

  let content;
  switch (activePage) {
    case 'accounts':
      content = <Accounts />;
      break;
    case 'subscription':
      content = <SubscriptionDashboard />;
      break;
    case 'profile':
      content = <UserProfile />;
      break;
    default:
      content = <ProfilePage />;
  }

  return (
    <div className="home-container">
      <ProfileHeader
        activePage={activePage}
        refreshPage={refreshPage}
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