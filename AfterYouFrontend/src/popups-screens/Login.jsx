import React, { useState } from "react";
import logo from "../assets/logo.png";
import useNavigation from "../hooks/useNavigate";
import "../style/Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ForgotPassword from "../main-screens/ForgotPassword";
import { loginUser } from "../Services/authService.js"; // ✅ import login API

const Login = () => {
  const { goToHome } = useNavigation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await loginUser(formData); // Expecting { token, userId }

    if (response.data === "fail") {
      setError("Invalid credentials.");
    } else {
      const { token, userId } = response.data;

      // ✅ Save token and userId to localStorage
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("userId", userId);
      console.log("token", token);
      console.log("userId", userId);
      goToHome(); // Navigate to homepage/dashboard
    }
  } catch (err) {
    console.error("Login error:", err);
    setError("Login failed. Please try again.");
  }
};


  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  if (showForgotPassword) {
    return <ForgotPassword onClose={() => setShowForgotPassword(false)} />;
  }

  return (
    <div className="login-container">
      <div className="login-frame">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="login-title">Login</h1>

        {error && <p className="error-message">{error}</p>} {/* ✅ Error message */}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-field"
                required
              />
              <span className="password-toggle" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="forgot-password">
              <a
                href="#"
                className="forgot-password-link"
                onClick={(e) => {
                  e.preventDefault();
                  setShowForgotPassword(true);
                }}
              >
                Forgot password?
              </a>
            </div>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
