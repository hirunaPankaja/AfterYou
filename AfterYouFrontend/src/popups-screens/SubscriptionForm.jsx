import React, { useState, useEffect } from "react";
import "../style/SubscriptionForm.css"; // ✅ Ensure correct CSS file import
import { getPrimaryAccounts } from "../Services/userAccountService"; // ✅ Import API call

const SubscriptionForm = () => {
  const [formData, setFormData] = useState({
    platformName: "",
    selectedPrimaryId: "",
    subscriptionPlan: "",
    planPrice: "",
  });

  const [validationError, setValidationError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [primaryAccounts, setPrimaryAccounts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Fetch user ID from local storage and get primary accounts from backend
  useEffect(() => {
    const userId = localStorage.getItem("userId"); // ✅ Get user ID from local storage
    if (userId) {
      fetchPrimaryAccounts(userId);
    }
  }, []);

  const fetchPrimaryAccounts = async (userId) => {
    try {
      // ✅ Fetch primary accounts linked to the user ID
      const response = await getPrimaryAccounts(userId);
      
      if (!response || response.length === 0) {
        setValidationError("No primary accounts found.");
        return;
      }

      console.log("Fetched primary accounts:", response);
      setPrimaryAccounts(response);

      // ✅ Set default selected primary ID
      setFormData((prev) => ({
        ...prev,
        selectedPrimaryId: response[0]?.primaryId || "",
      }));
    } catch (error) {
      console.error("Error fetching primary accounts:", error);
      setValidationError(error.response?.data || "Network error while fetching primary accounts.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setValidationError("");
    setSuccessMessage("");

    if (!formData.platformName || !formData.selectedPrimaryId || !formData.subscriptionPlan || !formData.planPrice) {
      setValidationError("All fields are required.");
      return;
    }

    if (isNaN(formData.planPrice) || Number(formData.planPrice) <= 0) {
      setValidationError("Please enter a valid price in LKR.");
      return;
    }

    setSuccessMessage("Subscription saved successfully!");
  };

  return (
    <div className="subscription-container">
      <div className="subscription-card">
        <h2 className="subscription-title">Manage Subscription</h2>

        <div className="subscription-form">
          <div className="subscription-form-group">
            <label>Platform Name</label>
            <input
              type="text"
              name="platformName"
              className="subscription-input"
              value={formData.platformName}
              onChange={handleInputChange}
              placeholder="Enter platform name"
              required
            />
          </div>

          <div className="subscription-form-group">
            <label>Select Primary Email</label>
            <select
              name="selectedPrimaryId"
              className="subscription-input"
              value={formData.selectedPrimaryId}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Primary Account</option>
              {primaryAccounts.length > 0 ? (
                primaryAccounts.map((account) => (
                  <option key={account.primaryId} value={account.primaryId}>
                    {account.email}
                  </option>
                ))
              ) : (
                <option disabled>No primary accounts available</option>
              )}
            </select>
          </div>

          <div className="subscription-form-group">
            <label>Subscription Plan</label>
            <select
              name="subscriptionPlan"
              className="subscription-input"
              value={formData.subscriptionPlan}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Plan</option>
              <option value="1_month">1 Month</option>
              <option value="3_months">3 Months</option>
              <option value="6_months">6 Months</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div className="subscription-form-group">
            <label>Plan Price (LKR)</label>
            <input
              type="number"
              name="planPrice"
              className="subscription-input"
              value={formData.planPrice}
              onChange={handleInputChange}
              placeholder="Enter plan price"
              required
            />
          </div>
        </div>

        {validationError && <p className="subscription-error">{validationError}</p>}
        {successMessage && <p className="subscription-success">{successMessage}</p>}

        <div className="subscription-buttons">
          <button className="subscription-save-button" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
          <button className="subscription-cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionForm;
