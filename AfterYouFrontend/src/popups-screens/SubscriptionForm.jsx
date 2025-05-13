import React, { useState, useEffect } from "react";
import "../style/SubscriptionForm.css"; // ✅ Ensure correct CSS file import
import { getPrimaryAccounts, addSubscription } from "../Services/userAccountService"; // ✅ Import API calls

const SubscriptionForm = () => {
  const [formData, setFormData] = useState({
    platformName: "",
    selectedPrimaryId: "",
    subscriptionPlan: "",
    planPrice: "",
    subscriptionStartDate: "",
    subscriptionEndDate: "",
  });

  const [validationError, setValidationError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [primaryAccounts, setPrimaryAccounts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    const userId = localStorage.getItem("userId"); // ✅ Get user ID from local storage
    if (userId) {
      fetchPrimaryAccounts(userId);
    }
  }, []);

  const fetchPrimaryAccounts = async (userId) => {
    try {
      const response = await getPrimaryAccounts(userId);
      
      if (!response || response.length === 0) {
        setValidationError("No primary accounts found.");
        return;
      }

      console.log("Fetched primary accounts:", response);
      setPrimaryAccounts(response);

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

  setFormData((prev) => ({
    ...prev,
    [name]: name === "selectedPrimaryId" ? Number(value) : value, // ✅ Convert selectedPrimaryId to a number
  }));
};
const handleSubmit = async () => {
  setValidationError("");
  setSuccessMessage("");
  setIsSubmitting(true);

  if (!formData.platformName || !formData.selectedPrimaryId || !formData.subscriptionPlan || !formData.planPrice || !formData.subscriptionStartDate || !formData.subscriptionEndDate) {
    setValidationError("All fields are required.");
    setIsSubmitting(false);
    return;
  }

  try {
    // ✅ Convert selectedPrimaryId to a number before comparison
    const selectedAccount = primaryAccounts.find(account => account.primaryId === formData.selectedPrimaryId);

    if (!selectedAccount) {
      setValidationError("Invalid primary account selected.");
      setIsSubmitting(false);
      return;
    }

    const response = await addSubscription({
      platformName: formData.platformName,
      primaryAccount: { email: selectedAccount.email }, // ✅ Send email instead of primaryId
      subscriptionPlan: formData.subscriptionPlan,
      planPrice: formData.planPrice,
      subscriptionStartDate: formData.subscriptionStartDate,
      subscriptionEndDate: formData.subscriptionEndDate,
    });

    console.log("Subscription saved:", response);
    setSuccessMessage("Subscription saved successfully!");
  } catch (error) {
    console.error("Error saving subscription:", error);
    setValidationError(error.response?.data || "Failed to save subscription.");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="subscription-container">
      <div className="subscription-card">
        <h2 className="subscription-title">Manage Subscription</h2>

        <div className="subscription-form">
          <div className="subscription-form-group">
            <label>Platform Name</label>
            <input type="text" name="platformName" className="subscription-input" value={formData.platformName} onChange={handleInputChange} placeholder="Enter platform name" required />
          </div>

          <div className="subscription-form-group">
            <label>Select Primary Email</label>
            <select name="selectedPrimaryId" className="subscription-input" value={formData.selectedPrimaryId} onChange={handleInputChange} required>
              <option value="">Select Primary Account</option>
              {primaryAccounts.map((account) => (
                <option key={account.primaryId} value={account.primaryId}>
                  {account.email}
                </option>
              ))}
            </select>
          </div>

          <div className="subscription-form-group">
            <label>Subscription Plan</label>
            <select name="subscriptionPlan" className="subscription-input" value={formData.subscriptionPlan} onChange={handleInputChange} required>
              <option value="">Select Plan</option>
              <option value="1_month">1 Month</option>
              <option value="3_months">3 Months</option>
              <option value="6_months">6 Months</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div className="subscription-form-group">
            <label>Plan Price (LKR)</label>
            <input type="number" name="planPrice" className="subscription-input" value={formData.planPrice} onChange={handleInputChange} placeholder="Enter plan price" required />
          </div>

          <div className="subscription-form-group">
            <label>Subscription Start Date</label>
            <input type="date" name="subscriptionStartDate" className="subscription-input" value={formData.subscriptionStartDate} onChange={handleInputChange} required />
          </div>

          <div className="subscription-form-group">
            <label>Subscription End Date</label>
            <input type="date" name="subscriptionEndDate" className="subscription-input" value={formData.subscriptionEndDate} onChange={handleInputChange} required />
          </div>
        </div>

        {validationError && <p className="subscription-error">{validationError}</p>}
        {successMessage && <p className="subscription-success">{successMessage}</p>}

        <button className="subscription-save-button" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default SubscriptionForm;
