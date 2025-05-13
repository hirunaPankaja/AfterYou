import React, { useState, useEffect } from "react";
import "../style/SubscriptionDashboard.css";
import SubscriptionCard from "../components/SubscriptionsCard";
import { getSubscriptions } from "../Services/userAccountService"; // ✅ Import API call

const formatSubscriptionPlan = (plan) => {
  const planMapping = {
    "1_month": "1 Month",
    "3_months": "3 Months",
    "6_months": "6 Months",
    "yearly": "Yearly",
  };
  return planMapping[plan] || plan; // ✅ Default to original if not found
};

const SubscriptionDashboard = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        console.log("Fetching subscriptions..."); 
        const data = await getSubscriptions();
        console.log("Fetched subscriptions:", data); 
        setSubscriptions(data);
      } catch (err) {
        setError("Failed to fetch subscriptions.");
        console.error("Error fetching subscriptions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  return (
    <div className="content-wrapper">
      <div className="left-section">
        <img 
          src="https://dashboard.codeparrot.ai/api/image/Z-qc3Qz4-w8v6RuL/manage-y.png" 
          alt="Social Media" 
          className="social-media-image" 
        />
      </div>
      <div className="right-section">
        <h2 className="section-title">Subscriptions</h2>

        <div className="subscription-divider"></div>

        {/* Show loading or error messages */}
        {loading && <p>Loading subscriptions...</p>}
        {error && <p className="error-message">{error}</p>}

        {/* Subscription cards displayed in two-column layout */}
        <div className="account-cards-grid">
          {subscriptions.length > 0 ? (
            subscriptions.map((subscription) => (
              <SubscriptionCard 
                key={subscription.subscriptionId} 
                subscriptionAccountCard={{
                  name: subscription.platformName, // ✅ Use platform name as fallback
                  type: formatSubscriptionPlan(subscription.subscriptionPlan), // ✅ Format subscription plan
                }}
                platform={subscription.platformName} 
              />
            ))
          ) : (
            <p>No subscriptions found.</p> // ✅ Show message if no subscriptions exist
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDashboard;
