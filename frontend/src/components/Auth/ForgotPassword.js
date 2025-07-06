import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      showToastMessage('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      showToastMessage('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      showToastMessage('Reset Link Sent');
    }, 1000);
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const handleBackToLogin = () => {
    window.location.href = '/login';
  };

  const pageStyles = {
    fontFamily: 'Arial, sans-serif',
    margin: 0,
    padding: 0,
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
  };

  const dotStyles = {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
  };

  const mainContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 80px)',
    padding: '40px 20px',
  };

  const contentContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '80px',
    maxWidth: '1200px',
    width: '100%',
  };

  const formContainerStyles = {
    flex: 1,
    maxWidth: '400px',
  };

  const titleStyles = {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '16px',
  };

  const subtitleStyles = {
    fontSize: '16px',
    color: '#666',
    marginBottom: '40px',
    lineHeight: '1.5',
  };

  const formStyles = {
    display: 'flex',
    flexDirection: 'column',
  };

  const labelStyles = {
    fontSize: '16px',
    fontWeight: '500',
    color: '#333',
    marginBottom: '8px',
  };

  const emailInputStyles = {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #e1e5e9',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
    marginBottom: '24px',
    transition: 'border-color 0.2s',
  };

  const resetButtonStyles = {
    backgroundColor: '#000',
    color: 'white',
    border: 'none',
    padding: '16px 24px',
    borderRadius: '25px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginBottom: '24px',
    transition: 'background-color 0.2s',
    textDecoration: 'underline',
  };

  const backLinkStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#666',
    fontSize: '16px',
    cursor: 'pointer',
    textDecoration: 'none',
  };

  const illustrationContainerStyles = {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const illustrationStyles = {
    width: '100%',
    maxWidth: '500px',
    height: 'auto',
  };

  const toastStyles = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    backgroundColor: '#28a745',
    color: 'white',
    padding: '16px 20px',
    borderRadius: '8px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    minWidth: '250px',
    zIndex: 1000,
    animation: 'slideIn 0.3s ease-out',
  };

  const toastHiddenStyles = {
    display: 'none',
  };

  const closeButtonStyles = {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '18px',
    marginLeft: 'auto',
  };

  const styleSheet = document.styleSheets[0];
  if (styleSheet && !document.querySelector('#toast-animation-forgot')) {
    const keyframes = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    const style = document.createElement('style');
    style.id = 'toast-animation-forgot';
    style.textContent = keyframes;
    document.head.appendChild(style);
  }

  const ForgotPasswordIllustration = () => (
    <svg
      style={illustrationStyles}
      viewBox="0 0 500 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Phone/Tablet */}
      <rect x="150" y="80" width="200" height="280" rx="20" fill="#4A90E2" />
      <rect x="160" y="90" width="180" height="260" rx="10" fill="white" />

      {/* User Avatar */}
      <circle cx="250" cy="150" r="25" fill="#E0E0E0" />
      <path d="M235 140 C235 135, 240 130, 250 130 C260 130, 265 135, 265 140" fill="#B0B0B0" />

      {/* Password dots */}
      <circle cx="220" cy="200" r="4" fill="#333" />
      <circle cx="235" cy="200" r="4" fill="#333" />
      <circle cx="250" cy="200" r="4" fill="#333" />
      <circle cx="265" cy="200" r="4" fill="#333" />
      <circle cx="280" cy="200" r="4" fill="#333" />

      {/* Login button */}
      <rect x="180" y="230" width="140" height="30" rx="15" fill="#4A90E2" />

      {/* Person */}
      <ellipse cx="380" cy="320" rx="15" ry="8" fill="#2C5AA0" />
      <rect x="365" y="280" width="30" height="40" fill="#4A90E2" />
      <circle cx="380" cy="260" r="15" fill="#FFB366" />
      <rect x="370" y="320" width="8" height="40" fill="#2C5AA0" />
      <rect x="382" y="320" width="8" height="40" fill="#2C5AA0" />
      <rect x="350" y="290" width="15" height="25" fill="#4A90E2" />
      <rect x="395" y="290" width="15" height="25" fill="#4A90E2" />

      {/* Speech bubble */}
      <ellipse cx="420" cy="200" rx="40" ry="25" fill="#E3F2FD" />
      <path d="M390 210 L400 220 L400 210 Z" fill="#E3F2FD" />
      <path d="M405 195 C405 190, 410 185, 420 185 C430 185, 435 190, 435 195" stroke="#4A90E2" strokeWidth="2" fill="none" />
    </svg>
  );

  return (
    <div style={pageStyles}>
      {/* Main Content */}
      <main style={mainContainerStyles}>
        <div style={contentContainerStyles}>
          {/* Form Section */}
          <div style={formContainerStyles}>
            <h1 style={titleStyles}>FORGOT PASSWORD?</h1>
            <p style={subtitleStyles}>No worries, We'll send you reset instructions</p>

            <form style={formStyles} onSubmit={handleResetPassword}>
              <label style={labelStyles}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                style={emailInputStyles}
                onFocus={(e) => {
                  e.target.style.borderColor = '#4A90E2';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e1e5e9';
                }}
              />

              <button
                type="submit"
                style={{
                  ...resetButtonStyles,
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
                disabled={isSubmitting}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.target.style.backgroundColor = '#333';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.target.style.backgroundColor = '#000';
                  }
                }}
              >
                {isSubmitting ? 'SENDING...' : 'RESET PASSWORD'}
              </button>
            </form>

            <div
              style={backLinkStyles}
              onClick={handleBackToLogin}
              onMouseEnter={(e) => {
                e.target.style.color = '#333';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#666';
              }}
            >
              <span>←</span>
              <span>Back to Login</span>
            </div>
          </div>

          {/* Illustration Section */}
          <div style={illustrationContainerStyles}>
            <ForgotPasswordIllustration />
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      <div style={showToast ? toastStyles : toastHiddenStyles}>
        <span style={{ fontSize: '20px' }}>✅</span>
        <span style={{ flex: 1, fontWeight: '500' }}>
          {toastMessage}
        </span>
        <button onClick={handleCloseToast} style={closeButtonStyles}>
          ×
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;