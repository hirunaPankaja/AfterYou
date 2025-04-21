import React, { useState } from 'react';
import AccountCard from './AccountCard';

function AddAccount() {
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const platforms = ['Facebook', 'Twitter', 'Instagram', 'Gmail'];

  const handlePlatformChange = (e) => {
    setSelectedPlatform(e.target.value);
  };

  return (
    <div className="add-account-form">
      <h2>Add Account</h2>

      <label>Platform Name</label>
      <select value={selectedPlatform} onChange={handlePlatformChange}>
        <option value="">-- Select Platform --</option>
        {platforms.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>

      {/* Other inputs like email, password, etc. can go here */}

      {selectedPlatform && (
        <AccountCard platform={selectedPlatform} />
      )}
    </div>
  );
}

export default AddAccount;
