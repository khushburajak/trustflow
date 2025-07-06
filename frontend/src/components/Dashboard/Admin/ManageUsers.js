import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    username: '',
    email: '',
    phone: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/users', getAuthHeaders());
      setUsers(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users');
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

  const handleEditUser = async (user) => {
    try {
      setSelectedUser(user);

      const response = await axios.get(`/api/users/profile`, {
        ...getAuthHeaders(),
        params: { userId: selectedUser._id }
      });

      const userData = response.data || user;
      setEditFormData({
        username: userData.username || user.username,
        email: userData.email || user.email,
        phone: userData.phone || user.phone || ''
      });

      setShowEditModal(true);
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setEditFormData({
        username: user.username,
        email: user.email,
        phone: user.phone || ''
      });
      setShowEditModal(true);
    }
  };

  const handleSaveEdit = async () => {
    try {
      setIsEditing(true);

      const requestBody = {
        id: selectedUser._id,
        username: editFormData.username,
        phone: editFormData.phone
      };

      await axios.put('/api/users/profile', requestBody, getAuthHeaders());

      setUsers(prevUsers =>
        prevUsers.map(user =>
          user._id === selectedUser._id
            ? {
              ...user,
              username: editFormData.username,
              phone: editFormData.phone
            }
            : user
        )
      );

      setShowEditModal(false);
      setSelectedUser(null);
      showToastMessage('User updated successfully!');

    } catch (err) {
      console.error('Error updating user:', err);
      showToastMessage('Failed to update user', 'error');
    } finally {
      setIsEditing(false);
    }
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const confirmDeleteUser = async () => {
    try {
      setIsDeleting(true);

      await axios.delete(`/api/users/${selectedUser._id}`, getAuthHeaders());

      setUsers(prevUsers =>
        prevUsers.filter(user => user._id !== selectedUser._id)
      );

      setShowDeleteModal(false);
      setSelectedUser(null);
      showToastMessage('User deactivated successfully!');

    } catch (err) {
      console.error('Error deleting user:', err);
      showToastMessage('Failed to deactivate user', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
    setEditFormData({ username: '', email: '', phone: '' });
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getRoleBadge = (role) => {
    const isAdmin = role === 'admin';
    return {
      text: role.charAt(0).toUpperCase() + role.slice(1),
      color: isAdmin ? '#dc3545' : '#28a745',
      bgColor: isAdmin ? '#f8d7da' : '#d4edda'
    };
  };

  const pageStyles = {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
  };

  const headerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const titleStyles = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    margin: 0,
  };

  const tableContainerStyles = {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  };

  const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const thStyles = {
    backgroundColor: '#f8f9fa',
    padding: '16px',
    textAlign: 'left',
    fontWeight: '600',
    color: '#333',
    borderBottom: '2px solid #dee2e6',
  };

  const tdStyles = {
    padding: '16px',
    borderBottom: '1px solid #dee2e6',
    color: '#555',
    verticalAlign: 'middle',
  };

  const actionButtonStyles = {
    padding: '6px 12px',
    margin: '0 4px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.2s',
  };

  const editButtonStyles = {
    ...actionButtonStyles,
    backgroundColor: '#007bff',
    color: 'white',
  };

  const deleteButtonStyles = {
    ...actionButtonStyles,
    backgroundColor: '#dc3545',
    color: 'white',
  };

  const roleBadgeStyles = (role) => ({
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
    color: role.color,
    backgroundColor: role.bgColor,
    display: 'inline-block',
  });

  const modalOverlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  const modalStyles = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '30px',
    maxWidth: '500px',
    width: '90%',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
  };

  const modalHeaderStyles = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center',
  };

  const formGroupStyles = {
    marginBottom: '20px',
  };

  const labelStyles = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '8px',
  };

  const inputStyles = {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const modalButtonContainerStyles = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '30px',
    paddingTop: '20px',
    borderTop: '1px solid #dee2e6',
  };

  const primaryButtonStyles = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'background-color 0.2s',
  };

  const secondaryButtonStyles = {
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'background-color 0.2s',
  };

  const dangerButtonStyles = {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'background-color 0.2s',
  };

  const deleteModalContentStyles = {
    textAlign: 'center',
    padding: '20px 0',
  };

  const deleteWarningStyles = {
    fontSize: '18px',
    color: '#333',
    marginBottom: '10px',
    fontWeight: '600',
  };

  const deleteSubtextStyles = {
    fontSize: '14px',
    color: '#666',
    marginBottom: '30px',
  };

  const loadingStyles = {
    textAlign: 'center',
    padding: '50px',
    fontSize: '18px',
  };

  const errorStyles = {
    textAlign: 'center',
    padding: '50px',
    fontSize: '18px',
    color: '#dc3545',
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
    zIndex: 1001,
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
  if (styleSheet && !document.querySelector('#toast-animation-users')) {
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
    style.id = 'toast-animation-users';
    style.textContent = keyframes;
    document.head.appendChild(style);
  }

  if (loading) {
    return <div style={loadingStyles}>Loading users...</div>;
  }

  if (error && users.length === 0) {
    return <div style={errorStyles}>{error}</div>;
  }

  return (
    <div style={pageStyles}>
      {/* Header */}
      <div style={headerStyles}>
        <h1 style={titleStyles}>Manage Users</h1>
      </div>

      {/* Users Table */}
      <div style={tableContainerStyles}>
        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={thStyles}>Username</th>
              <th style={thStyles}>Email</th>
              <th style={thStyles}>Role</th>
              <th style={thStyles}>Phone</th>
              <th style={thStyles}>Status</th>
              <th style={thStyles}>Created</th>
              <th style={thStyles}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const role = getRoleBadge(user.role);
              return (
                <tr key={user._id}>
                  <td style={tdStyles}>
                    <strong>{user.username}</strong>
                  </td>
                  <td style={tdStyles}>{user.email}</td>
                  <td style={tdStyles}>
                    <span style={roleBadgeStyles(role)}>
                      {role.text}
                    </span>
                  </td>
                  <td style={tdStyles}>{user.phone || 'N/A'}</td>
                  <td style={tdStyles}>
                    <span style={{
                      color: user.isActive ? '#28a745' : '#dc3545',
                      fontWeight: '500'
                    }}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={tdStyles}>{formatDate(user.createdAt)}</td>
                  <td style={tdStyles}>
                    <button
                      style={editButtonStyles}
                      onClick={() => handleEditUser(user)}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#0056b3';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#007bff';
                      }}
                    >
                      Edit
                    </button>
                    <button
                      style={deleteButtonStyles}
                      onClick={() => handleDeleteUser(user)}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#c82333';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#dc3545';
                      }}
                    >
                      Deactivate
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div style={modalOverlayStyles} onClick={closeEditModal}>
          <div style={modalStyles} onClick={(e) => e.stopPropagation()}>
            <h2 style={modalHeaderStyles}>Edit User</h2>

            <div style={formGroupStyles}>
              <label style={labelStyles}>Email</label>
              <div
                style={{
                  ...inputStyles,
                  backgroundColor: '#f0f0f0',
                  paddingTop: '8px',
                  paddingBottom: '8px',
                  borderRadius: '4px',
                  color: '#555',
                  cursor: 'not-allowed'
                }}
              >
                {editFormData.email}
              </div>
            </div>

            <div style={formGroupStyles}>
              <label style={labelStyles}>Username</label>
              <input
                type="text"
                name="username"
                value={editFormData.username}
                onChange={handleInputChange}
                style={inputStyles}
                onFocus={(e) => {
                  e.target.style.borderColor = '#007bff';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#ddd';
                }}
              />
            </div>

            <div style={formGroupStyles}>
              <label style={labelStyles}>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={editFormData.phone}
                onChange={handleInputChange}
                style={inputStyles}
                onFocus={(e) => {
                  e.target.style.borderColor = '#007bff';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#ddd';
                }}
              />
            </div>

            <div style={modalButtonContainerStyles}>
              <button
                style={secondaryButtonStyles}
                onClick={closeEditModal}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#5a6268';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#6c757d';
                }}
              >
                Close
              </button>
              <button
                style={{
                  ...primaryButtonStyles,
                  opacity: isEditing ? 0.7 : 1,
                  cursor: isEditing ? 'not-allowed' : 'pointer'
                }}
                onClick={handleSaveEdit}
                disabled={isEditing}
                onMouseEnter={(e) => {
                  if (!isEditing) {
                    e.target.style.backgroundColor = '#0056b3';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isEditing) {
                    e.target.style.backgroundColor = '#007bff';
                  }
                }}
              >
                {isEditing ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedUser && (
        <div style={modalOverlayStyles} onClick={closeDeleteModal}>
          <div style={modalStyles} onClick={(e) => e.stopPropagation()}>
            <h2 style={modalHeaderStyles}>Confirm Deactivation</h2>

            <div style={deleteModalContentStyles}>
              <div style={deleteWarningStyles}>
                Are you sure you want to delete this user?
              </div>
              <div style={deleteSubtextStyles}>
                This action cannot be undone.
              </div>
              <div style={{ fontSize: '16px', color: '#333', marginBottom: '20px' }}>
                <strong>User:</strong> {selectedUser.username} ({selectedUser.email})
              </div>
            </div>

            <div style={modalButtonContainerStyles}>
              <button
                style={secondaryButtonStyles}
                onClick={closeDeleteModal}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#5a6268';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#6c757d';
                }}
              >
                Cancel
              </button>
              <button
                style={{
                  ...dangerButtonStyles,
                  opacity: isDeleting ? 0.7 : 1,
                  cursor: isDeleting ? 'not-allowed' : 'pointer'
                }}
                onClick={confirmDeleteUser}
                disabled={isDeleting}
                onMouseEnter={(e) => {
                  if (!isDeleting) {
                    e.target.style.backgroundColor = '#c82333';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isDeleting) {
                    e.target.style.backgroundColor = '#dc3545';
                  }
                }}
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

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

export default ManageUsers;