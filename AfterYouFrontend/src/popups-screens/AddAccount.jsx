import React, { useState } from 'react';
import '../Style/AddAccount.css';

const platforms = [
  { name: 'Facebook', icon: '📘' },
  { name: 'Twitter', icon: '🐦' },
  { name: 'Instagram', icon: '📸' },
  { name: 'LinkedIn', icon: '💼' },
  { name: 'YouTube', icon: '📺' }
];

function AddAccount() {
  const [formData, setFormData] = useState({
    platformName: '',
    username: '',
    profileUrl: '',
    email: '',
    password: '',
    is2FA: false,
    recoveryCode: '',
    deleteAction: false,
    transferAction: false,
  });

  const [animate, setAnimate] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'platformName') {
      const icon = platforms.find(p => p.name === value)?.icon || '';
      setSelectedIcon(icon);
    }
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAnimate(true);
    setTimeout(() => setAnimate(false), 2000);
  };

  return (
    <div className="add-account__overlay">
      <form className="add-account__form" onSubmit={handleSubmit}>
        <h3 className="add-account__title">Add Account</h3>
        <div className="add-account__grid">
          <div className="add-account__group">
            <label>Platform</label>
            <select name="platformName" value={formData.platformName} onChange={handleChange} required>
              <option value="">Select</option>
              {platforms.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
            </select>
          </div>

          <div className="add-account__group">
            <label>Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
          </div>

          <div className="add-account__group">
            <label>Profile URL</label>
            <input type="text" name="profileUrl" value={formData.profileUrl} onChange={handleChange} />
          </div>

          <div className="add-account__group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>

          <div className="add-account__group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
          </div>

          <div className="add-account__group">
            <label>Recovery Code</label>
            <input type="text" name="recoveryCode" value={formData.recoveryCode} onChange={handleChange} />
          </div>

          <div className="add-account__checkbox">
            <label><input type="checkbox" name="is2FA" checked={formData.is2FA} onChange={handleChange} />2FA</label>
          </div>
          <div className="add-account__checkbox">
            <label><input type="checkbox" name="deleteAction" checked={formData.deleteAction} onChange={handleChange} />Delete</label>
          </div>
          <div className="add-account__checkbox">
            <label><input type="checkbox" name="transferAction" checked={formData.transferAction} onChange={handleChange} />Transfer</label>
          </div>
        </div>

        <button type="submit" className="add-account__submit">Submit</button>
      </form>

      {animate && (
        <div className="add-account__animation">
          <div className="add-account__icon">{selectedIcon}</div>
          <div className="add-account__coffin">⚰️</div>
        </div>
      )}
    </div>
  );
}

export default AddAccount;
