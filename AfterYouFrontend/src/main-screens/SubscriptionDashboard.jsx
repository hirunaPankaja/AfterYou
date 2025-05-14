import React, { useState, useEffect } from "react";
import "../style/SubscriptionDashboard.css";
import SubscriptionCard from "../components/SubscriptionsCard";
import { getPrimaryAccounts, getSubscriptionsByPrimaryAccount, deleteSubscription } from "../Services/userAccountService"; // ✅ Import API calls

const formatSubscriptionPlan = (plan) => {
  const planMapping = {
    "1_month": "1 Month",
    "3_months": "3 Months",
    "6_months": "6 Months",
    "yearly": "Yearly",
  };
  return planMapping[plan] || plan;
};

const SubscriptionDashboard = () => {
  const [primaryAccounts, setPrimaryAccounts] = useState([]);
  const [selectedPrimaryId, setSelectedPrimaryId] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchPrimaryAccounts();
  }, []);

  // ✅ Fetch all primary accounts for the user
  const fetchPrimaryAccounts = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        console.error("User authentication error. Please log in.");
        setErrorMessage("User authentication error. Please log in.");
        return;
      }

      console.log("Fetching primary accounts for userId:", userId); // ✅ Debugging log

      const primaryAccounts = await getPrimaryAccounts();
      console.log("Primary accounts fetched successfully:", primaryAccounts); // ✅ Debugging log

      setPrimaryAccounts(primaryAccounts);

      // ✅ Set default selected primary account if available
      if (primaryAccounts.length > 0) {
        setSelectedPrimaryId(primaryAccounts[0].primaryId);
      }
    } catch (error) {
      console.error("Error fetching primary accounts:", error.response ? error.response.data : error.message);
      setErrorMessage("Error fetching primary accounts.");
    }
  };

  useEffect(() => {
    if (selectedPrimaryId !== null) {
      fetchSubscriptions(selectedPrimaryId);
    }
  }, [selectedPrimaryId]); // ✅ Fetch subscriptions when selectedPrimaryId changes

  const fetchSubscriptions = async (primaryId) => {
    try {
      setLoading(true); // ✅ Reset loading state when fetching new subscriptions
      setErrorMessage(""); // ✅ Clear previous errors before fetching new data
      console.log(`Fetching subscriptions for primary account ID: ${primaryId}`);
      const data = await getSubscriptionsByPrimaryAccount(primaryId);
      console.log(`Subscriptions for primaryId ${primaryId}:`, data); // ✅ Debugging log
      setSubscriptions(data);
    } catch (error) {
      console.error(`Error fetching subscriptions for primaryId ${primaryId}:`, error.response ? error.response.data : error.message);
      setErrorMessage("Error fetching subscriptions.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrimaryAccountChange = (e) => {
    const newPrimaryId = Number(e.target.value);
    setSelectedPrimaryId(newPrimaryId);
  };

 const handleDeleteSubscription = async (subscriptionId) => {
  try {
    console.log("Deleting subscription with ID:", subscriptionId); // ✅ Debugging log

    await deleteSubscription(subscriptionId); // ✅ Call API to delete subscription
    setSubscriptions(subscriptions.filter(sub => sub.subscriptionId !== subscriptionId)); 
  } catch (error) {
    console.error("Error deleting subscription:", error);
  }
};

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

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* ✅ Dropdown to select primary account */}
        {primaryAccounts.length > 0 ? (
          <div className="primary-account-dropdown">
            <label htmlFor="primaryAccountSelect">Select Primary Account:</label>
            <select 
              id="primaryAccountSelect" 
              className="useraccountselection-form-input" 
              value={selectedPrimaryId || ""} 
              onChange={handlePrimaryAccountChange}
            >
              {primaryAccounts.map(account => (
                <option key={account.primaryId} value={account.primaryId}>
                  {account.email}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <p className="no-accounts-message">No primary accounts found.</p>
        )}

        {/* ✅ Show loading message */}
        {loading && <p>Loading subscriptions...</p>}

        {/* ✅ Display subscriptions for the selected primary account */}
        <div className="account-cards-grid">
          {subscriptions.length > 0 ? (
            subscriptions.map(subscription => (
              <SubscriptionCard 
                key={subscription.subscriptionId} 
                subscriptionAccountCard={{
                  subscriptionId: subscription.subscriptionId, // ✅ Pass subscription ID for deletion
                  name: subscription.platformName, 
                  type: formatSubscriptionPlan(subscription.subscriptionPlan), 
                }}
                platform={subscription.platformName} 
                onDelete={handleDeleteSubscription} // ✅ Handle deletion
              />
            ))
          ) : (
            !loading && <p className="no-accounts-message">No subscriptions found for this primary account.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDashboard;
