import React, { useState } from 'react';
import axios from 'axios';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (formData.password !== formData.confirmPassword) {
      showToastMessage("Passwords don't match!", 'error');
      return;
    }

    if (formData.password.length < 6) {
      showToastMessage("Password must be at least 6 characters long!", 'error');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('/api/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200 || response.status === 201) {
        showToastMessage('Account created successfully! Welcome to TrustFlow!', 'success');

        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      }

    } catch (error) {
      console.error('Registration error:', error);

      if (error.response) {
        const errorMessage = error.response.data?.message ||
          error.response.data?.error ||
          'Registration failed. Please try again.';
        showToastMessage(errorMessage, 'error');
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
                {/* Background elements */}
                <div style={{
                  position: 'absolute',
                  top: '40px',
                  left: '40px',
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#fbb6ce',
                  borderRadius: '50%',
                  opacity: 0.8,
                }}></div>
                <div style={{
                  position: 'absolute',
                  top: '80px',
                  right: '40px',
                  width: '64px',
                  height: '64px',
                  backgroundColor: '#c084fc',
                  borderRadius: '50%',
                  opacity: 0.8,
                }}></div>

                {/* Main phone/tablet */}
                <div style={{
                  position: 'absolute',
                  top: '64px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '192px',
                  height: '256px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '16px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                  border: '4px solid #d1d5db',
                }}>
                  {/* Screen content */}
                  <div style={{
                    padding: '16px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    {/* Stars */}
                    <div style={{
                      display: 'flex',
                      gap: '4px',
                      marginBottom: '16px',
                    }}>
                      <span style={{ color: '#fbbf24', fontSize: '24px' }}>★</span>
                      <span style={{ color: '#fbbf24', fontSize: '24px' }}>★</span>
                      <span style={{ color: '#fbbf24', fontSize: '24px' }}>★</span>
                      <span style={{ color: '#fbbf24', fontSize: '24px' }}>★</span>
                      <span style={{ color: '#d1d5db', fontSize: '24px' }}>★</span>
                    </div>
                    {/* Product placeholder */}
                    <div style={{
                      width: '64px',
                      height: '80px',
                      background: 'linear-gradient(to bottom, #f87171, #dc2626)',
                      borderRadius: '8px',
                      marginBottom: '16px',
                      position: 'relative',
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: '8px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '32px',
                        height: '12px',
                        backgroundColor: '#7c3aed',
                        borderRadius: '4px',
                      }}></div>
                    </div>
                  </div>
                </div>

                {/* Main character */}
                <div style={{
                  position: 'absolute',
                  bottom: '64px',
                  left: '32px',
                }}>
                  {/* Person */}
                  <div style={{ position: 'relative' }}>
                    {/* Body */}
                    <div style={{
                      width: '64px',
                      height: '80px',
                      background: 'linear-gradient(to bottom, #a78bfa, #7c3aed)',
                      borderRadius: '32px 32px 0 0',
                    }}></div>
                    {/* Head */}
                    <div style={{
                      position: 'absolute',
                      top: '-24px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '32px',
                      height: '32px',
                      backgroundColor: '#fde047',
                      borderRadius: '50%',
                    }}></div>
                    {/* Hair */}
                    <div style={{
                      position: 'absolute',
                      top: '-32px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '40px',
                      height: '24px',
                      backgroundColor: '#581c87',
                      borderRadius: '20px 20px 0 0',
                    }}></div>
                    {/* Shopping bag */}
                    <div style={{
                      position: 'absolute',
                      right: '-16px',
                      top: '16px',
                      width: '24px',
                      height: '32px',
                      backgroundColor: '#f472b6',
                      borderRadius: '2px',
                    }}></div>
                  </div>
                </div>

                {/* Small people */}
                <div style={{
                  position: 'absolute',
                  bottom: '32px',
                  right: '64px',
                }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {/* Person 1 */}
                    <div style={{
                      width: '16px',
                      height: '32px',
                      backgroundColor: '#3b82f6',
                      borderRadius: '8px 8px 0 0',
                    }}></div>
                    {/* Person 2 */}
                    <div style={{
                      width: '16px',
                      height: '24px',
                      backgroundColor: '#ec4899',
                      borderRadius: '8px 8px 0 0',
                    }}></div>
                  </div>
                </div>

                {/* Heart icon */}
                <div style={{
                  position: 'absolute',
                  top: '128px',
                  right: '32px',
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#f472b6',
                  borderRadius: '4px',
                  transform: 'rotate(45deg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-8px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '16px',
                    height: '16px',
                    backgroundColor: '#f472b6',
                    borderRadius: '50%',
                  }}></div>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '-8px',
                    transform: 'translateY(-50%)',
                    width: '16px',
                    height: '16px',
                    backgroundColor: '#f472b6',
                    borderRadius: '50%',
                  }}></div>
                  <span style={{
                    color: 'white',
                    fontSize: '12px',
                    transform: 'rotate(-45deg)',
                  }}>
                    ♥
                  </span>
                </div>
              </div>
            </div>

            {/* Right side - Signup Form */}
            <div style={formContainerStyles}>
              <div style={formStyles}>
                <h1 style={titleStyles}>SIGN UP</h1>

                <form onSubmit={handleSubmit}>
                  <div style={fieldGroupStyles}>
                    <label htmlFor="username" style={labelStyles}>
                      Username
                    </label>
                    <input
                      id="username"
                      type="text"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      style={inputStyles}
                      onFocus={(e) => Object.assign(e.target.style, inputFocusStyles)}
                      onBlur={(e) => Object.assign(e.target.style, inputStyles)}
                      required
                      minLength="3"
                    />
                  </div>

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
                      PASSWORD
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
                        minLength="6"
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

                  <div style={fieldGroupStyles}>
                    <label htmlFor="confirmPassword" style={labelStyles}>
                      Confirm Password
                    </label>
                    <div style={passwordContainerStyles}>
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        style={{ ...inputStyles, paddingRight: '40px' }}
                        onFocus={(e) => Object.assign(e.target.style, { ...inputFocusStyles, paddingRight: '40px' })}
                        onBlur={(e) => Object.assign(e.target.style, { ...inputStyles, paddingRight: '40px' })}
                        required
                        minLength="6"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={eyeButtonStyles}
                      >
                        {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
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
                    {isLoading ? 'SIGNING UP...' : 'SIGN UP'}
                  </button>

                  <div style={linkTextStyles}>
                    Already Registered?{' '}
                    <a href="/login" style={linkStyles}>
                      Sign in
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
          {toastType === 'success' ? '✅' : '❌'}
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

export default SignupPage;