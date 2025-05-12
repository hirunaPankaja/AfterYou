import React, { useState } from "react";
import logo from "../assets/logo.png";
import useNavigation from "../hooks/useNavigate";
import "../style/Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ForgotPassword from "../main-screens/ForgotPassword";
import { loginUser } from "../Services/authService.js"; // ✅ Import login API
import PopupMessage from "../popups-screens/PopupMessage"; // ✅ Import Popup Component

const Login = () => {
  const { goToHome } = useNavigation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [popupMessage, setPopupMessage] = useState(""); // ✅ Popup message state
  const [popupType, setPopupType] = useState(""); // ✅ "success" or "error"

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
      // ✅ Updated error message
    } else {
      const { token, userId } = response.data;

      // ✅ Save token and userId to localStorage
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("userId", userId);
      console.log("token", token);
      console.log("userId", userId);

      showPopup("✅ Login successful!", "success"); // ✅ Updated success message

      setTimeout(() => {
        goToHome(); // ✅ Navigate to homepage after success
      }, 900); 
    }
  } catch (err) {
    console.error("Login error:", err);
     showPopup("⚠️ Email or password is incorrect. Please try again.", "error");
  }
};

const showPopup = (message, type) => {
  setPopupMessage(message);
  setPopupType(type);
};

const closePopup = () => {
  setPopupMessage("");
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

        {/* ✅ Popup Message */}
        {popupMessage && <PopupMessage message={popupMessage} type={popupType} />}

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
