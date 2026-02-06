import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleNavigate = (e) => {
    e.preventDefault(); // stop form refresh

    if (username === "ombhai" && password === "12345") {
      navigate("/AdminDashboard");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <>
      <div className="login-container">
        {/* Animated background elements */}
        <div className="bg-sphere sphere-1"></div>
        <div className="bg-sphere sphere-2"></div>
        <div className="bg-sphere sphere-3"></div>

        {/* Floating cubes */}
        <div className="cube cube-1"></div>
        <div className="cube cube-2"></div>
        <div className="cube cube-3"></div>

        <div className="login-card">
          <div className="card-glow"></div>

          <div className="login-header">
            <div className="admin-icon">
              <div className="icon-circle">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            </div>
            <h1>Administrator Portal</h1>
            <p>Enter your credentials to access the dashboard</p>
          </div>

          <form className="login-form" onSubmit={handleNavigate}>
            <div className="input-group">
              <div className="input-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <input
                type="text"
                name="username"
                placeholder="Username or Email"
                required
                className="input-field"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="input-group">
              <div className="input-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="input-field"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="submit-btn"
              // onClick={handleNavigate}
            >
              <span>Access Dashboard</span>

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="arrow-animate"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </form>

          <div className="login-footer">
            <p>
              Need help? <a href="#">Contact Support</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
