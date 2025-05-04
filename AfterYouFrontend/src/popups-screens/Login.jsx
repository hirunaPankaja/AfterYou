import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Step 1: Import Link from react-router-dom
import logo from '../assets/logo.png'; // Adjust the path as necessary
import useNavigation from '../hooks/useNavigate';
import '../style/Login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons from react-icons

const Login = () => {
  const { goToHome } = useNavigation();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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

            <div className="form-group password-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-container">
                <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field"
                />
                <span
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              </div>
              <div className="forgot-password">
                {/* Step 2: Replace anchor tag with Link */}
                <Link to="/forgot-password">Forgot password?</Link>
              </div>
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
