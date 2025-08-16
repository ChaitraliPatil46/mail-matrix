import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check if user is already authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("userEmail");
    
    if (token && userEmail) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setError(null);
    
    // Redirect to Google OAuth
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="login-container">
      {/* Background Animation */}
      <div className="background-animation">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="login-content">
        {/* Header Section */}
        <header className="login-header">
          <div className="logo-container">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z" fill="url(#gradient)"/>
                <path d="M20 8L12 13L4 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#667eea"/>
                    <stop offset="100%" stopColor="#764ba2"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h1 className="app-title">Mail Matrix</h1>
            <p className="app-subtitle">Organize your emails with AI-powered folders</p>
          </div>
        </header>

        {/* Login Card */}
        <div className="login-card">
          <div className="card-header">
            <h2 className="welcome-text">Welcome Back</h2>
            <p className="welcome-subtitle">Sign in to access your organized email workspace</p>
          </div>

          <div className="card-body">
            {error && (
              <div className="error-message">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                {error}
              </div>
            )}

            <button 
              className={`google-login-btn ${isLoading ? 'loading' : ''}`}
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <div className="btn-content">
                <div className="google-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
                <span className="btn-text">
                  {isLoading ? 'Signing in...' : 'Continue with Google'}
                </span>
              </div>
              {isLoading && <div className="loading-spinner"></div>}
            </button>

            <div className="terms-text">
              By continuing, you agree to our{" "}
              <a href="#" className="terms-link">Terms of Service</a> and{" "}
              <a href="#" className="terms-link">Privacy Policy</a>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 4H4C2.89 4 2 4.89 2 6V18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V8C22 6.89 21.11 6 20 6H12L10 4Z"/>
                </svg>
              </div>
              <h3 className="feature-title">Smart Folders</h3>
              <p className="feature-description">AI-powered email organization that learns from your habits</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3S3 5.91 3 9.5S5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14Z"/>
                </svg>
              </div>
              <h3 className="feature-title">Lightning Fast</h3>
              <p className="feature-description">Search through thousands of emails in milliseconds</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 1.01L7 1C5.9 1 5 1.9 5 3V21C5 22.1 5.9 23 7 23H17C18.1 23 19 22.1 19 21V3C19 1.9 18.1 1.01 17 1.01ZM17 19H7V5H17V19Z"/>
                </svg>
              </div>
              <h3 className="feature-title">Mobile Ready</h3>
              <p className="feature-description">Access your organized emails from anywhere, anytime</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="login-footer">
          <p className="footer-text">
            © 2024 Mail Matrix. Built with ❤️ for better email management.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Login;
