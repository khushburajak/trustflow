import React, { useState, useEffect, useRef } from 'react';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setIsAuthenticated(true);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);

        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');

    setIsAuthenticated(false);
    setUser(null);

    showToastMessage('Logged out successfully!');

    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
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

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDropdownItemClick = (action) => {
    setShowDropdown(false);

    switch (action) {
      case 'manage-products':
        window.location.href = '/admin/products';
        break;
      case 'manage-reviews':
        window.location.href = '/admin/reviews';
        break;
      case 'manage-users':
        window.location.href = '/admin/users';
        break;
      case 'my-reviews':
        window.location.href = '/my-reviews';
        break;
        break;
      case 'settings':
        window.location.href = '/settings';
        break;
      default:
        break;
    }
  };

  const headerStyles = {
    width: '100%',
    backgroundColor: 'white',
    borderBottom: '1px solid #e5e7eb',
    padding: '16px 24px',
  };

  const containerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1280px',
    margin: '0 auto',
  };

  const logoContainerStyles = {
    display: 'flex',
    alignItems: 'center',
  };

  const logoStyles = {
    backgroundColor: 'black',
    padding: '8px 12px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  };

  const dotStyles = {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
  };

  const redDotStyles = {
    ...dotStyles,
    backgroundColor: '#ef4444',
  };

  const orangeDotStyles = {
    ...dotStyles,
    backgroundColor: '#f97316',
  };

  const logoTextStyles = {
    color: 'white',
    fontWeight: '600',
    marginLeft: '8px',
    fontSize: '16px',
  };

  const searchContainerStyles = {
    flex: '1',
    maxWidth: '384px',
    margin: '0 32px',
  };

  const searchWrapperStyles = {
    position: 'relative',
  };

  const searchInputStyles = {
    width: '100%',
    padding: '8px 40px 8px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
  };

  const searchIconStyles = {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af',
    width: '16px',
    height: '16px',
  };

  const navStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
  };

  const navLinkStyles = {
    color: '#374151',
    fontWeight: '500',
    textDecoration: 'none',
    fontSize: '14px',
    cursor: 'pointer',
  };

  const authContainerStyles = {
    color: '#374151',
    fontWeight: '500',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  };

  const userInfoContainerStyles = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const userInfoStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#374151',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
  };

  const dropdownArrowStyles = {
    marginLeft: '4px',
    fontSize: '12px',
    transition: 'transform 0.2s',
    transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
  };

  const dropdownStyles = {
    position: 'absolute',
    top: '100%',
    left: '0',
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    minWidth: '180px',
    zIndex: 1000,
    marginTop: '4px',
  };

  const dropdownItemStyles = {
    padding: '12px 16px',
    fontSize: '14px',
    color: '#374151',
    cursor: 'pointer',
    borderBottom: '1px solid #f3f4f6',
    transition: 'background-color 0.2s',
  };

  const lastDropdownItemStyles = {
    ...dropdownItemStyles,
    borderBottom: 'none',
  };

  const logoutButtonStyles = {
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  };

  const authLinkStyles = {
    cursor: 'pointer',
    transition: 'color 0.2s',
    fontWeight: 'bold',
  };

  const separatorStyles = {
    margin: '0 4px',
  };

  const toastStyles = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    backgroundColor: '#10b981',
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

  const SearchIcon = () => (
    <svg
      style={searchIconStyles}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );

  const getDropdownOptions = () => {
    if (user?.role === 'admin') {
      return [
        { label: 'Manage Products', action: 'manage-products' },
        { label: 'Manage Reviews', action: 'manage-reviews' },
        { label: 'Manage Users', action: 'manage-users' }
      ];
    } else {
      return [
        { label: 'My Reviews', action: 'my-reviews' },
        { label: 'Settings', action: 'settings' }
      ];
    }
  };

  return (
    <>
      <header style={headerStyles}>
        <div style={containerStyles}>
          {/* Logo */}
          <a href="/" style={{ textDecoration: 'none' }}>
            <div style={logoContainerStyles}>
              <div style={logoStyles}>
                <div style={redDotStyles}></div>
                <div style={orangeDotStyles}></div>
                <span style={logoTextStyles}>TrustFlow</span>
              </div>
            </div>
          </a>

          {/* Search Bar */}
          <div style={searchContainerStyles}>
            <div style={searchWrapperStyles}>
              <input
                type="text"
                placeholder="Search..."
                style={searchInputStyles}
              />
              <SearchIcon />
            </div>
          </div>

          {/* Navigation */}
          <nav style={navStyles}>
            <a
              href="products"
              style={navLinkStyles}
              onMouseEnter={(e) => e.target.style.color = '#111827'}
              onMouseLeave={(e) => e.target.style.color = '#374151'}
            >
              BROWSE PRODUCTS
            </a>
            <a
              href="savemoreonapp"
              style={navLinkStyles}
              onMouseEnter={(e) => e.target.style.color = '#111827'}
              onMouseLeave={(e) => e.target.style.color = '#374151'}
            >
              SAVE MORE ON APP
            </a>

            {/* Authentication Section */}
            <div style={authContainerStyles}>
              {isAuthenticated ? (
                <>
                  <div style={userInfoContainerStyles} ref={dropdownRef}>
                    <div
                      style={userInfoStyles}
                      onClick={toggleDropdown}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#f3f4f6';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                      }}
                    >
                      <span>Welcome, {user?.name || user?.username || 'User'}!</span>
                      <span style={dropdownArrowStyles}>▼</span>
                    </div>

                    {/* Dropdown Menu */}
                    {showDropdown && (
                      <div style={dropdownStyles}>
                        {getDropdownOptions().map((option, index) => (
                          <div
                            key={option.action}
                            style={index === getDropdownOptions().length - 1 ? lastDropdownItemStyles : dropdownItemStyles}
                            onClick={() => handleDropdownItemClick(option.action)}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = '#f3f4f6';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = 'white';
                            }}
                          >
                            {option.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    style={logoutButtonStyles}
                    onClick={handleLogout}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#dc2626';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#ef4444';
                    }}
                  >
                    LOGOUT
                  </button>
                </>
              ) : (
                <>
                  <span
                    style={authLinkStyles}
                    onClick={() => window.location.href = '/login'}
                    onMouseEnter={(e) => e.target.style.color = '#111827'}
                    onMouseLeave={(e) => e.target.style.color = '#374151'}
                  >
                    LOGIN
                  </span>
                  <span style={separatorStyles}>|</span>
                  <span
                    style={authLinkStyles}
                    onClick={() => window.location.href = '/signup'}
                    onMouseEnter={(e) => e.target.style.color = '#111827'}
                    onMouseLeave={(e) => e.target.style.color = '#374151'}
                  >
                    SIGNUP
                  </span>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>

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
    </>
  );
};

export default Header;