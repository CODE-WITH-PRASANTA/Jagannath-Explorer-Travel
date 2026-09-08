import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FiMail, 
  FiLock, 
  FiEye, 
  FiEyeOff, 
  FiCheckCircle, 
  FiArrowRight 
} from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { RiPlaneLine } from "react-icons/ri";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ identifier: "", password: "", rememberMe: true });
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Specific Authentication Check
    if (formData.identifier === "jagannatha" && formData.password === "12345") {
      sessionStorage.setItem("isAdminAuthenticated", "true");
      setIsSuccess(true);
      
      setTimeout(() => {
        navigate("/");
      }, 2500);
    } else {
      setErrorMessage("Invalid Credentials! Use ID: jagannatha & Pass: 12345");
    }
  };

  return (
    <div className="Login-container">
      {/* 3D Animated Full-Page Overlay on Success */}
      {isSuccess && (
        <div className="Login-success-overlay">
          <div className="Login-success-card-3d">
            <div className="Login-success-icon-wrapper">
              <FiCheckCircle size={80} className="Login-success-icon" />
            </div>
            <h1 className="Login-success-title">LOGIN SUCCESSFUL</h1>
            <p className="Login-success-subtitle">Welcome back to Jagannath Explorer Admin Portal</p>
            <div className="Login-success-loader"></div>
          </div>
        </div>
      )}

      {/* Main Glassmorphic Card Container */}
      <div className={`Login-card-wrapper ${isSuccess ? "Login-blur" : ""}`}>
        
        {/* Left Branding Panel */}
        <div className="Login-brand-section">
          <div className="Login-brand-header">
            <div className="Login-logo-container">
              <div className="Login-logo-badge">
                <div className="Login-logo-temple-icon">🏛️</div>
              </div>
              <div className="Login-logo-text-group">
                <h2 className="Login-brand-title">Jagannath Explorer</h2>
                <span className="Login-brand-subtitle">TRAVELS</span>
                <p className="Login-brand-tagline">Explore • Discover • Travel</p>
              </div>
            </div>
          </div>

          <div className="Login-hero-content">
            <h1 className="Login-hero-heading">
              Discover the <br />
              <span className="Login-hero-highlight">Beautiful Odisha</span>
            </h1>
            <p className="Login-hero-description">
              Your trusted tour and travel partner in Odisha, offering customized tour packages, adventure trips, and memorable travel experiences.
            </p>
          </div>

          <div className="Login-hero-footer">
            <p className="Login-handwritten">
              Travel More <br /> Live Better <RiPlaneLine className="Login-plane-icon" />
            </p>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="Login-form-section">
          {/* Avatar Icon */}
          <div className="Login-avatar-container">
            <div className="Login-avatar-3d">
              <FaUser size={26} color="#2e7d32" />
            </div>
          </div>

          <div className="Login-form-header">
            <h2>Welcome Back</h2>
            <p>Login to your account and continue your journey with Jagannath Explorer Travels.</p>
          </div>

          {errorMessage && <div className="Login-error-badge">{errorMessage}</div>}

          <form onSubmit={handleSubmit} className="Login-form">
            <div className="Login-input-group">
              <FiMail className="Login-input-icon" size={18} />
              <input
                type="text"
                name="identifier"
                placeholder="Email Address or Mobile Number"
                value={formData.identifier}
                onChange={handleChange}
                required
              />
            </div>

            <div className="Login-input-group">
              <FiLock className="Login-input-icon" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="Login-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>

            <div className="Login-form-options">
              <label className="Login-checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span>Remember me</span>
              </label>
              <a href="#forgot" className="Login-forgot-link">Forgot Password?</a>
            </div>

            <button type="submit" className="Login-submit-btn">
              <span>Login</span>
              <FiArrowRight size={18} />
            </button>

            <div className="Login-divider">
              <span>Default Admin Credentials</span>
            </div>

            {/* Displaying ID & Password in Middle */}
            <div className="Login-credentials-box">
              <div className="Login-cred-item">
                <span className="Login-cred-label">ID:</span>
                <span className="Login-cred-value">jagannatha</span>
              </div>
              <div className="Login-cred-divider">|</div>
              <div className="Login-cred-item">
                <span className="Login-cred-label">Password:</span>
                <span className="Login-cred-value">12345</span>
              </div>
            </div>

            <p className="Login-signup-prompt">
              
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;