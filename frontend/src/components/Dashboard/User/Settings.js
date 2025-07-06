import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Settings = () => {
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phoneNumber: ''
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    email: ''
  });
  const [loading, setLoading] = useState(true);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/users/profile', getAuthHeaders());
      const userData = response.data;

      setProfileData({
        fullName: userData.fullName || userData.username || '',
        email: userData.email || '',
        phoneNumber: userData.phoneNumber || userData.phone || ''
      });

      setPasswordData(prev => ({
        ...prev,
        email: userData.email || ''
      }));

    } catch (err) {
      console.error('Error fetching profile:', err);
      showToastMessage('Failed to load profile data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    return {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
  };

  const showToastMessage = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateProfileForm = () => {
    const newErrors = {};

    if (!profileData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!profileData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(profileData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!profileData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[\d\s\-$$$$]{10,}$/.test(profileData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors = {};

    if (!passwordData.oldPassword) {
      newErrors.oldPassword = 'Current password is required';
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters long';
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!passwordData.email.trim()) {
      newErrors.passwordEmail = 'Email is required';
    } else if (!validateEmail(passwordData.email)) {
      newErrors.passwordEmail = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!validateProfileForm()) {
      return;
    }

    try {
      setIsUpdatingProfile(true);

      await axios.put('/api/users/profile', {
        fullName: profileData.fullName,
        email: profileData.email,
        phoneNumber: profileData.phoneNumber
      }, getAuthHeaders());

      showToastMessage('Profile updated successfully!');

    } catch (err) {
      console.error('Error updating profile:', err);
      showToastMessage('Failed to update profile', 'error');
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!validatePasswordForm()) {
      return;
    }

    try {
      setIsChangingPassword(true);

      await axios.put('/api/users/change-password', {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
        email: passwordData.email
      }, getAuthHeaders());

      setPasswordData(prev => ({
        ...prev,
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));

      showToastMessage('Password changed successfully!');

    } catch (err) {
      console.error('Error changing password:', err);
      const errorMessage = err.response?.data?.message || 'Failed to change password';
      showToastMessage(errorMessage, 'error');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const pageStyles = {
    fontFamily: 'Arial, sans-serif',
    margin: 0,
    padding: 0,
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
  };

  const mainContainerStyles = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px 20px',
  };

  const titleStyles = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: '40px',
  };

  const sectionStyles = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '30px',
    marginBottom: '30px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  };

  const formRowStyles = {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
  };

  const formGroupStyles = {
    flex: 1,
    marginBottom: '20px',
  };

  const labelStyles = {
    display: 'block',
    fontSize: '12px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  const inputStyles = {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.2s',
    backgroundColor: '#f8f9fa',
  };

  const errorInputStyles = {
    ...inputStyles,
    borderColor: '#dc3545',
  };

  const errorTextStyles = {
    color: '#dc3545',
    fontSize: '12px',
    marginTop: '4px',
  };

  const buttonStyles = {
    backgroundColor: '#000',
    color: 'white',
    border: 'none',
    padding: '12px 32px',
    borderRadius: '25px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    display: 'block',
    margin: '0 auto',
  };

  const sectionTitleStyles = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: '30px',
  };

  const loadingStyles = {
    textAlign: 'center',
    padding: '50px',
    fontSize: '18px',
  };

  const toastStyles = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    backgroundColor: toastType === 'success' ? '#28a745' : '#dc3545',
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
  };

  const toastHiddenStyles = {
    display: 'none',
  };

  const toastCloseButtonStyles = {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '18px',
    marginLeft: 'auto',
  };

  const styleSheet = document.styleSheets[0];
  if (styleSheet && !document.querySelector('#toast-animation-settings')) {
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
    style.id = 'toast-animation-settings';
    style.textContent = keyframes;
    document.head.appendChild(style);
  }

  if (loading) {
    return <div style={loadingStyles}>Loading profile...</div>;
  }

  return (
    <div style={pageStyles}>
      {/* Main Content */}
      <main style={mainContainerStyles}>
        <h1 style={titleStyles}>Edit Profile</h1>

        {/* Profile Information Section */}
        <div style={sectionStyles}>
          <form onSubmit={handleUpdateProfile}>
            <div style={formRowStyles}>
              <div style={formGroupStyles}>
                <label style={labelStyles}>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleProfileInputChange}
                  style={errors.fullName ? errorInputStyles : inputStyles}
                  onFocus={(e) => {
                    if (!errors.fullName) {
                      e.target.style.borderColor = '#007bff';
                    }
                  }}
                  onBlur={(e) => {
                    if (!errors.fullName) {
                      e.target.style.borderColor = '#ddd';
                    }
                  }}
                />
                {errors.fullName && <div style={errorTextStyles}>{errors.fullName}</div>}
              </div>

              <div style={formGroupStyles}>
                <label style={labelStyles}>Phone No</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={profileData.phoneNumber}
                  onChange={handleProfileInputChange}
                  style={errors.phoneNumber ? errorInputStyles : inputStyles}
                  onFocus={(e) => {
                    if (!errors.phoneNumber) {
                      e.target.style.borderColor = '#007bff';
                    }
                  }}
                  onBlur={(e) => {
                    if (!errors.phoneNumber) {
                      e.target.style.borderColor = '#ddd';
                    }
                  }}
                />
                {errors.phoneNumber && <div style={errorTextStyles}>{errors.phoneNumber}</div>}
              </div>
            </div>

            <div style={formGroupStyles}>
              <label style={labelStyles}>Email</label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleProfileInputChange}
                style={errors.email ? errorInputStyles : inputStyles}
                onFocus={(e) => {
                  if (!errors.email) {
                    e.target.style.borderColor = '#007bff';
                  }
                }}
                onBlur={(e) => {
                  if (!errors.email) {
                    e.target.style.borderColor = '#ddd';
                  }
                }}
              />
              {errors.email && <div style={errorTextStyles}>{errors.email}</div>}
            </div>

            <button
              type="submit"
              style={{
                ...buttonStyles,
                opacity: isUpdatingProfile ? 0.7 : 1,
                cursor: isUpdatingProfile ? 'not-allowed' : 'pointer'
              }}
              disabled={isUpdatingProfile}
              onMouseEnter={(e) => {
                if (!isUpdatingProfile) {
                  e.target.style.backgroundColor = '#333';
                }
              }}
              onMouseLeave={(e) => {
                if (!isUpdatingProfile) {
                  e.target.style.backgroundColor = '#000';
                }
              }}
            >
              {isUpdatingProfile ? 'UPDATING...' : 'UPDATE'}
            </button>
          </form>
        </div>

        {/* Change Password Section */}
        <div style={sectionStyles}>
          <h2 style={sectionTitleStyles}>Change Password</h2>

          <form onSubmit={handleChangePassword}>
            <div style={formRowStyles}>
              <div style={formGroupStyles}>
                <label style={labelStyles}>Old Password</label>
                <input
                  type="password"
                  name="oldPassword"
                  value={passwordData.oldPassword}
                  onChange={handlePasswordInputChange}
                  style={errors.oldPassword ? errorInputStyles : inputStyles}
                  onFocus={(e) => {
                    if (!errors.oldPassword) {
                      e.target.style.borderColor = '#007bff';
                    }
                  }}
                  onBlur={(e) => {
                    if (!errors.oldPassword) {
                      e.target.style.borderColor = '#ddd';
                    }
                  }}
                />
                {errors.oldPassword && <div style={errorTextStyles}>{errors.oldPassword}</div>}
              </div>

              <div style={formGroupStyles}>
                <label style={labelStyles}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={passwordData.email}
                  onChange={handlePasswordInputChange}
                  style={errors.passwordEmail ? errorInputStyles : inputStyles}
                  onFocus={(e) => {
                    if (!errors.passwordEmail) {
                      e.target.style.borderColor = '#007bff';
                    }
                  }}
                  onBlur={(e) => {
                    if (!errors.passwordEmail) {
                      e.target.style.borderColor = '#ddd';
                    }
                  }}
                />
                {errors.passwordEmail && <div style={errorTextStyles}>{errors.passwordEmail}</div>}
              </div>
            </div>

            <div style={formGroupStyles}>
              <label style={labelStyles}>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordInputChange}
                style={errors.newPassword ? errorInputStyles : inputStyles}
                onFocus={(e) => {
                  if (!errors.newPassword) {
                    e.target.style.borderColor = '#007bff';
                  }
                }}
                onBlur={(e) => {
                  if (!errors.newPassword) {
                    e.target.style.borderColor = '#ddd';
                  }
                }}
              />
              {errors.newPassword && <div style={errorTextStyles}>{errors.newPassword}</div>}
            </div>

            <div style={formGroupStyles}>
              <label style={labelStyles}>Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordInputChange}
                style={errors.confirmPassword ? errorInputStyles : inputStyles}
                onFocus={(e) => {
                  if (!errors.confirmPassword) {
                    e.target.style.borderColor = '#007bff';
                  }
                }}
                onBlur={(e) => {
                  if (!errors.confirmPassword) {
                    e.target.style.borderColor = '#ddd';
                  }
                }}
              />
              {errors.confirmPassword && <div style={errorTextStyles}>{errors.confirmPassword}</div>}
            </div>

            <button
              type="submit"
              style={{
                ...buttonStyles,
                opacity: isChangingPassword ? 0.7 : 1,
                cursor: isChangingPassword ? 'not-allowed' : 'pointer'
              }}
              disabled={isChangingPassword}
              onMouseEnter={(e) => {
                if (!isChangingPassword) {
                  e.target.style.backgroundColor = '#333';
                }
              }}
              onMouseLeave={(e) => {
                if (!isChangingPassword) {
                  e.target.style.backgroundColor = '#000';
                }
              }}
            >
              {isChangingPassword ? 'CHANGING...' : 'CHANGE PASSWORD'}
            </button>
          </form>
        </div>
      </main>

      {/* Toast Notification */}
      <div style={showToast ? toastStyles : toastHiddenStyles}>
        <span style={{ fontSize: '20px' }}>
          {toastType === 'success' ? '✅' : '❌'}
        </span>
        <span style={{ flex: 1, fontWeight: '500' }}>
          {toastMessage}
        </span>
        <button onClick={handleCloseToast} style={toastCloseButtonStyles}>
          ×
        </button>
      </div>
    </div>
  );
};

export default Settings;