import React, { useState } from 'react';
import logo from '../assets/logo.png'; // Adjust the path as necessary
import useNavigation from '../hooks/useNavigate';
import '../style/Login.css';


const Login = () => {
  const { goToHome } = useNavigation();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="login-container">
      <div className="login-frame">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="login-title">Login</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <button type="submit" className="login-button" onClick={goToHome}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

