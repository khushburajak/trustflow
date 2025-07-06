import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const pageStyles = {
    fontFamily: 'Arial, sans-serif',
    margin: 0,
    padding: 0,
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
  };

  const mainStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 24px',
  };

  const containerStyles = {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '48px',
    alignItems: 'center',
  };

  const illustrationContainerStyles = {
    display: 'flex',
    justifyContent: 'center',
  };

  const illustrationStyles = {
    width: '400px',
    height: '400px',
    position: 'relative',
  };

  const formContainerStyles = {
    display: 'flex',
    justifyContent: 'center',
  };

  const formStyles = {
    width: '100%',
    maxWidth: '400px',
  };

  const titleStyles = {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '32px',
    textAlign: 'center',
  };

  const fieldGroupStyles = {
    marginBottom: '24px',
  };

  const labelStyles = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '8px',
  };

  const inputStyles = {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
  };

  const inputFocusStyles = {
    borderColor: '#000',
    boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.1)',
  };

  const passwordContainerStyles = {
    position: 'relative',
  };

  const eyeButtonStyles = {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#9ca3af',
    fontSize: '18px',
  };

  const forgotPasswordStyles = {
    textAlign: 'right',
    marginBottom: '24px',
  };

  const forgotPasswordLinkStyles = {
    color: '#6b7280',
    fontSize: '14px',
    textDecoration: 'none',
  };

  const submitButtonStyles = {
    width: '100%',
    backgroundColor: '#000',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'background-color 0.2s',
    marginBottom: '16px',
  };

  const submitButtonDisabledStyles = {
    ...submitButtonStyles,
    opacity: 0.5,
    cursor: 'not-allowed',
  };

  const linkTextStyles = {
    textAlign: 'center',
    fontSize: '14px',
    color: '#6b7280',
  };

  const linkStyles = {
    color: '#000',
    fontWeight: '500',
    textDecoration: 'none',
  };

  const getToastStyles = (type) => ({
    position: 'fixed',
    top: '20px',
    right: '20px',
    backgroundColor: type === 'success' ? '#10b981' : '#ef4444',
    color: 'white',
    padding: '16px 20px',
    borderRadius: '8px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    minWidth: '300px',
    zIndex: 1000,
    animation: 'slideIn 0.3s ease-out',
  });

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
  if (styleSheet && !document.querySelector('#toast-animation')) {
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
    style.id = 'toast-animation';
    style.textContent = keyframes;
    document.head.appendChild(style);
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const showToastMessage = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      showToastMessage('Please fill in all fields!', 'error');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('api/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;

        if (token) {
          localStorage.setItem('authToken', token);
          localStorage.setItem('user', JSON.stringify(user));
        }

        showToastMessage(`Welcome back, ${user?.name || user?.username || 'User'}!`, 'success');

        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      }

    } catch (error) {
      console.error('Login error:', error);

      if (error.response) {
        const status = error.response.status;
        const errorMessage = error.response.data?.message ||
          error.response.data?.error ||
          'Login failed. Please try again.';

        if (status === 401) {
          showToastMessage('Invalid email or password. Please try again.', 'error');
        } else if (status === 404) {
          showToastMessage('Account not found. Please check your email or sign up.', 'error');
        } else if (status === 429) {
          showToastMessage('Too many login attempts. Please try again later.', 'error');
        } else {
          showToastMessage(errorMessage, 'error');
        }
      } else if (error.request) {
        showToastMessage('Network error. Please check your connection and try again.', 'error');
      } else {
        showToastMessage('An unexpected error occurred. Please try again.', 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const EyeIcon = () => '👁';
  const EyeOffIcon = () => '🙈';

  return (
    <div style={pageStyles}>
      <main style={mainStyles}>
        <div style={containerStyles}>
          <div style={gridStyles}>
            {/* Left side - Illustration */}
            <div style={illustrationContainerStyles}>
              <div style={illustrationStyles}>
                {/* Background bubble */}
                <div style={{
                  position: 'absolute',
                  top: '50px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '300px',
                  height: '120px',
                  backgroundColor: '#e0e7ff',
                  borderRadius: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}>
                  {/* 5 Stars */}
                  <span style={{ color: '#fbbf24', fontSize: '32px' }}>★</span>
                  <span style={{ color: '#fbbf24', fontSize: '32px' }}>★</span>
                  <span style={{ color: '#fbbf24', fontSize: '32px' }}>★</span>
                  <span style={{ color: '#fbbf24', fontSize: '32px' }}>★</span>
                  <span style={{ color: '#fbbf24', fontSize: '32px' }}>★</span>
                </div>

                {/* Main phone/tablet */}
                <div style={{
                  position: 'absolute',
                  top: '120px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '160px',
                  height: '200px',
                  backgroundColor: '#6366f1',
                  borderRadius: '20px',
                  border: '8px solid #4f46e5',
                }}>
                  {/* Phone screen */}
                  <div style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#f8fafc',
                    borderRadius: '12px',
                    position: 'relative',
                  }}>
                    {/* Notch */}
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '60px',
                      height: '20px',
                      backgroundColor: '#4f46e5',
                      borderRadius: '10px',
                    }}></div>
                  </div>
                </div>

                {/* Left person (man) */}
                <div style={{
                  position: 'absolute',
                  bottom: '40px',
                  left: '60px',
                }}>
                  {/* Body */}
                  <div style={{
                    width: '50px',
                    height: '70px',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '25px 25px 0 0',
                    position: 'relative',
                  }}>
                    {/* Head */}
                    <div style={{
                      position: 'absolute',
                      top: '-25px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '30px',
                      height: '30px',
                      backgroundColor: '#fbbf24',
                      borderRadius: '50%',
                    }}></div>
                    {/* Hair */}
                    <div style={{
                      position: 'absolute',
                      top: '-30px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '32px',
                      height: '20px',
                      backgroundColor: '#92400e',
                      borderRadius: '16px 16px 0 0',
                    }}></div>
                    {/* Arms */}
                    <div style={{
                      position: 'absolute',
                      top: '15px',
                      left: '-15px',
                      width: '20px',
                      height: '40px',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '10px',
                      transform: 'rotate(-30deg)',
                    }}></div>
                    <div style={{
                      position: 'absolute',
                      top: '15px',
                      right: '-15px',
                      width: '20px',
                      height: '40px',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '10px',
                      transform: 'rotate(30deg)',
                    }}></div>
                  </div>
                  {/* Legs */}
                  <div style={{
                    display: 'flex',
                    gap: '5px',
                    justifyContent: 'center',
                  }}>
                    <div style={{
                      width: '15px',
                      height: '40px',
                      backgroundColor: '#6366f1',
                      borderRadius: '0 0 8px 8px',
                    }}></div>
                    <div style={{
                      width: '15px',
                      height: '40px',
                      backgroundColor: '#6366f1',
                      borderRadius: '0 0 8px 8px',
                    }}></div>
                  </div>
                </div>

                {/* Right person (woman) */}
                <div style={{
                  position: 'absolute',
                  bottom: '40px',
                  right: '60px',
                }}>
                  {/* Body */}
                  <div style={{
                    width: '50px',
                    height: '70px',
                    backgroundColor: '#8b5cf6',
                    borderRadius: '25px 25px 0 0',
                    position: 'relative',
                  }}>
                    {/* Head */}
                    <div style={{
                      position: 'absolute',
                      top: '-25px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '30px',
                      height: '30px',
                      backgroundColor: '#fbbf24',
                      borderRadius: '50%',
                    }}></div>
                    {/* Hair */}
                    <div style={{
                      position: 'absolute',
                      top: '-35px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '40px',
                      height: '30px',
                      backgroundColor: '#581c87',
                      borderRadius: '20px 20px 0 0',
                    }}></div>
                    {/* Arms - celebrating pose */}
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      left: '-20px',
                      width: '25px',
                      height: '35px',
                      backgroundColor: '#8b5cf6',
                      borderRadius: '12px',
                      transform: 'rotate(-45deg)',
                    }}></div>
                    <div style={{
                      position: 'absolute',
                      top: '5px',
                      right: '-20px',
                      width: '25px',
                      height: '35px',
                      backgroundColor: '#8b5cf6',
                      borderRadius: '12px',
                      transform: 'rotate(45deg)',
                    }}></div>
                  </div>
                  {/* Dress/Skirt */}
                  <div style={{
                    width: '60px',
                    height: '30px',
                    backgroundColor: '#8b5cf6',
                    borderRadius: '0 0 30px 30px',
                    marginLeft: '-5px',
                  }}></div>
                  {/* Legs */}
                  <div style={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'center',
                    marginTop: '5px',
                  }}>
                    <div style={{
                      width: '12px',
                      height: '25px',
                      backgroundColor: '#fbbf24',
                      borderRadius: '0 0 6px 6px',
                    }}></div>
                    <div style={{
                      width: '12px',
                      height: '25px',
                      backgroundColor: '#fbbf24',
                      borderRadius: '0 0 6px 6px',
                    }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Login Form */}
            <div style={formContainerStyles}>
              <div style={formStyles}>
                <h1 style={titleStyles}>SIGN IN</h1>

                <form onSubmit={handleSubmit}>
                  <div style={fieldGroupStyles}>
                    <label htmlFor="email" style={labelStyles}>
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      style={inputStyles}
                      onFocus={(e) => Object.assign(e.target.style, inputFocusStyles)}
                      onBlur={(e) => Object.assign(e.target.style, inputStyles)}
                      required
                    />
                  </div>

                  <div style={fieldGroupStyles}>
                    <label htmlFor="password" style={labelStyles}>
                      Password
                    </label>
                    <div style={passwordContainerStyles}>
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        style={{ ...inputStyles, paddingRight: '40px' }}
                        onFocus={(e) => Object.assign(e.target.style, { ...inputFocusStyles, paddingRight: '40px' })}
                        onBlur={(e) => Object.assign(e.target.style, { ...inputStyles, paddingRight: '40px' })}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={eyeButtonStyles}
                      >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                  </div>

                  <div style={forgotPasswordStyles}>
                    <a
                      href="forgot-password"
                      onClick={(e) => {
                      }}
                      style={forgotPasswordLinkStyles}
                    >
                      Forgot Password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    style={isLoading ? submitButtonDisabledStyles : submitButtonStyles}
                    onMouseEnter={(e) => {
                      if (!isLoading) {
                        e.target.style.backgroundColor = '#374151';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isLoading) {
                        e.target.style.backgroundColor = '#000';
                      }
                    }}
                  >
                    {isLoading ? 'SIGNING IN...' : 'Sign In'}
                  </button>

                  <div style={linkTextStyles}>
                    Don't have account?{' '}
                    <a href="/signup" style={linkStyles}>
                      Sign up
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      <div style={showToast ? getToastStyles(toastType) : toastHiddenStyles}>
        <span style={{ fontSize: '20px' }}>
          {toastType === 'success' ? '✅' : toastType === 'error' ? '❌' : 'ℹ️'}
        </span>
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

export default LoginPage;