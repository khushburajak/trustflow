import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [moderatingReview, setModeratingReview] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/reviews', getAuthHeaders());
      setReviews(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Failed to load reviews');
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

  const handleViewReview = (review) => {
    setSelectedReview(review);
    setShowDetailModal(true);
  };

  const handleModerateReview = async (reviewId, isApproved) => {
    try {
      setModeratingReview(true);

      await axios.put(`/api/reviews/${reviewId}/moderate`, {
        isApproved: isApproved
      }, getAuthHeaders());

      setReviews(prevReviews =>
        prevReviews.map(review =>
          review._id === reviewId
            ? { ...review, isApproved: isApproved }
            : review
        )
      );

      setShowDetailModal(false);
      setSelectedReview(null);

      showToastMessage(
        `Review ${isApproved ? 'approved' : 'rejected'} successfully!`,
        'success'
      );

    } catch (err) {
      console.error('Error moderating review:', err);
      showToastMessage('Failed to moderate review', 'error');
    } finally {
      setModeratingReview(false);
    }
  };

  const closeModal = () => {
    setShowDetailModal(false);
    setSelectedReview(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (isApproved) => {
    if (isApproved === null) {
      return { text: 'Pending', color: '#ffc107', bgColor: '#fff3cd' };
    } else if (isApproved === true) {
      return { text: 'Approved', color: '#28a745', bgColor: '#d4edda' };
    } else {
      return { text: 'Rejected', color: '#dc3545', bgColor: '#f8d7da' };
    }
  };

  const renderStars = (rating) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
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
    verticalAlign: 'top',
  };

  const eyeIconStyles = {
    color: '#007bff',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'color 0.2s',
  };

  const statusBadgeStyles = (status) => ({
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
    color: status.color,
    backgroundColor: status.bgColor,
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
    marginBottom: '25px',
    color: '#333',
    textAlign: 'center',
  };

  const reviewDetailStyles = {
    marginBottom: '25px',
  };

  const productNameStyles = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
  };

  const userSectionStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
  };

  const userImageStyles = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
  };

  const userNameStyles = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#333',
  };

  const ratingContainerStyles = {
    marginBottom: '20px',
    textAlign: 'center',
  };

  const ratingLabelStyles = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '8px',
    display: 'block',
  };

  const ratingStarsStyles = {
    color: '#ffc107',
    fontSize: '24px',
  };

  const commentSectionStyles = {
    marginBottom: '25px',
  };

  const commentLabelStyles = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '10px',
    display: 'block',
  };

  const commentTextStyles = {
    fontSize: '15px',
    color: '#555',
    lineHeight: '1.6',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #e9ecef',
  };

  const modalButtonContainerStyles = {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginTop: '30px',
    paddingTop: '20px',
    borderTop: '1px solid #dee2e6',
  };

  const approveButtonStyles = {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'background-color 0.2s',
    disabled: moderatingReview,
  };

  const rejectButtonStyles = {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'background-color 0.2s',
    disabled: moderatingReview,
  };

  const closeButtonStyles = {
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
  if (styleSheet && !document.querySelector('#toast-animation-reviews')) {
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
    style.id = 'toast-animation-reviews';
    style.textContent = keyframes;
    document.head.appendChild(style);
  }

  const EyeIcon = () => (
    <svg
      style={eyeIconStyles}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );

  if (loading) {
    return <div style={loadingStyles}>Loading reviews...</div>;
  }

  if (error && reviews.length === 0) {
    return <div style={errorStyles}>{error}</div>;
  }

  return (
    <div style={pageStyles}>
      {/* Header */}
      <div style={headerStyles}>
        <h1 style={titleStyles}>Manage Reviews</h1>
      </div>

      {/* Reviews Table */}
      <div style={tableContainerStyles}>
        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={thStyles}>Product Name</th>
              <th style={thStyles}>Description</th>
              <th style={thStyles}>Comment</th>
              <th style={thStyles}>User Name</th>
              <th style={thStyles}>Rating</th>
              <th style={thStyles}>Status</th>
              <th style={thStyles}>Date</th>
              <th style={thStyles}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => {
              const status = getStatusBadge(review.isApproved);
              return (
                <tr key={review._id}>
                  <td style={tdStyles}>
                    <strong>{review.product.name}</strong>
                  </td>
                  <td style={tdStyles}>
                    {review.product.description?.length > 80
                      ? `${review.product.description.substring(0, 80)}...`
                      : review.product.description}
                  </td>
                  <td style={tdStyles}>
                    {review.comment?.length > 100
                      ? `${review.comment.substring(0, 100)}...`
                      : review.comment}
                  </td>
                  <td style={tdStyles}>
                    <strong>{review.user.username}</strong>
                  </td>
                  <td style={tdStyles}>
                    <div style={{ color: '#ffc107', fontSize: '16px' }}>
                      {renderStars(review.rating)}
                    </div>
                  </td>
                  <td style={tdStyles}>
                    <span style={statusBadgeStyles(status)}>
                      {status.text}
                    </span>
                  </td>
                  <td style={tdStyles}>
                    {formatDate(review.createdAt)}
                  </td>
                  <td style={tdStyles}>
                    <span
                      onClick={() => handleViewReview(review)}
                      onMouseEnter={(e) => {
                        e.target.style.color = '#0056b3';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = '#007bff';
                      }}
                    >
                      <EyeIcon />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Simplified Review Detail Modal */}
      {showDetailModal && selectedReview && (
        <div style={modalOverlayStyles} onClick={closeModal}>
          <div style={modalStyles} onClick={(e) => e.stopPropagation()}>
            <h2 style={modalHeaderStyles}>Review Details</h2>

            <div style={reviewDetailStyles}>
              {/* Product Name */}
              <div style={productNameStyles}>
                {selectedReview.productName}
              </div>

              {/* User Information */}
              <div style={userSectionStyles}>
                <span style={ratingLabelStyles}>Reviewed By:</span>
                <span style={userNameStyles}>{selectedReview.user.username}</span>
              </div>

              {/* Rating */}
              <div style={ratingContainerStyles}>
                <span style={ratingLabelStyles}>Rating</span>
                <div style={ratingStarsStyles}>
                  {renderStars(selectedReview.rating)} ({selectedReview.rating}/5)
                </div>
              </div>

              {/* Comment */}
              <div style={commentSectionStyles}>
                <span style={commentLabelStyles}>Comment</span>
                <div style={commentTextStyles}>
                  {selectedReview.comment}
                </div>
              </div>
            </div>

            <div style={modalButtonContainerStyles}>
              <button
                style={closeButtonStyles}
                onClick={closeModal}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#5a6268';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#6c757d';
                }}
              >
                Close
              </button>

              {selectedReview.isApproved !== true && (
                <button
                  style={{
                    ...approveButtonStyles,
                    opacity: moderatingReview ? 0.7 : 1,
                    cursor: moderatingReview ? 'not-allowed' : 'pointer'
                  }}
                  onClick={() => handleModerateReview(selectedReview._id, true)}
                  disabled={moderatingReview}
                  onMouseEnter={(e) => {
                    if (!moderatingReview) {
                      e.target.style.backgroundColor = '#218838';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!moderatingReview) {
                      e.target.style.backgroundColor = '#28a745';
                    }
                  }}
                >
                  {moderatingReview ? 'Processing...' : 'Approve'}
                </button>
              )}

              {selectedReview.isApproved !== false && (
                <button
                  style={{
                    ...rejectButtonStyles,
                    opacity: moderatingReview ? 0.7 : 1,
                    cursor: moderatingReview ? 'not-allowed' : 'pointer'
                  }}
                  onClick={() => handleModerateReview(selectedReview._id, false)}
                  disabled={moderatingReview}
                  onMouseEnter={(e) => {
                    if (!moderatingReview) {
                      e.target.style.backgroundColor = '#c82333';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!moderatingReview) {
                      e.target.style.backgroundColor = '#dc3545';
                    }
                  }}
                >
                  {moderatingReview ? 'Processing...' : 'Reject'}
                </button>
              )}
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

export default ManageReviews;