import React, { useState } from "react";
import logo from "../assets/logo.png";
import useNavigation from "../hooks/useNavigate";
import "../style/ExecutorLoginForm.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ForgotPassword from "../main-screens/ForgotPassword";
import { loginExecutor } from "../Services/executorSerivce";
import PopupMessage from "../popups-screens/PopupMessage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate




const ExecutorLogin = () => {
  const { goToExecutorHome } = useNavigation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
  const executorId = localStorage.getItem("executorId");
  if (executorId) {
    navigate("/executor", { replace: true }); // 👈 redirect with history replace
  }
}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const showPopup = (message, type) => {
    setPopupMessage(message);
    setPopupType(type);
    setTimeout(() => {
      setPopupMessage("");
      setPopupType("");
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginExecutor(formData); // POST API call

      if (response.data === "fail") {
        showPopup("❌ Invalid email or password", "error");
      } else {
        const { executorId, email } = response.data;

        // Save to localStorage
        localStorage.setItem("executorId", executorId);
        localStorage.setItem("executorEmail", email);

        showPopup("✅ Login successful!", "success");

        setTimeout(() => {
          goToExecutorHome(); // Redirect to home
        }, 900);
      }
    } catch (error) {
      console.error("Login error:", error);
      showPopup("❌ Login failed. Please try again later.", "error");
    }
  };

  if (showForgotPassword) {
    return <ForgotPassword onClose={() => setShowForgotPassword(false)} />;
  }

  return (
    <div className="login-container">
      <div className="login-frame">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="login-title">Executor Login</h1>

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

      {popupMessage && <PopupMessage message={popupMessage} type={popupType} />}
    </div>
  );
};

export default ExecutorLogin;
