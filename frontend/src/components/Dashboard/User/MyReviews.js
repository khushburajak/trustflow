import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [editFormData, setEditFormData] = useState({
    rating: 5,
    comment: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  useEffect(() => {
    fetchUserReviews();
  }, []);

  const fetchUserReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/reviews/user', getAuthHeaders());
      setReviews(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching user reviews:', err);
      setError('Failed to load your reviews');
      setReviews([]);
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

  const handleEditReview = async (review) => {
    try {
      setSelectedReview(review);

      const response = await axios.get(`/api/reviews/${review._id}`, getAuthHeaders());

      const reviewData = response.data || review;
      setEditFormData({
        rating: reviewData.rating || review.rating,
        comment: reviewData.comment || review.comment
      });

      setShowEditModal(true);
    } catch (err) {
      console.error('Error fetching review data:', err);
      setEditFormData({
        rating: review.rating,
        comment: review.comment
      });
      setShowEditModal(true);
    }
  };

  const handleSaveEdit = async () => {
    try {
      setIsEditing(true);

      await axios.put(`/api/reviews/${selectedReview._id}`, {
        rating: editFormData.rating,
        comment: editFormData.comment
      }, getAuthHeaders());

      setReviews(prevReviews =>
        prevReviews.map(review =>
          review._id === selectedReview._id
            ? {
              ...review,
              rating: editFormData.rating,
              comment: editFormData.comment
            }
            : review
        )
      );

      setShowEditModal(false);
      setSelectedReview(null);
      showToastMessage('Review updated successfully!');

    } catch (err) {
      console.error('Error updating review:', err);
      showToastMessage('Failed to update review', 'error');
    } finally {
      setIsEditing(false);
    }
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedReview(null);
    setEditFormData({ rating: 5, comment: '' });
  };

  const handleRatingChange = (rating) => {
    setEditFormData(prev => ({
      ...prev,
      rating: rating
    }));
  };

  const handleCommentChange = (e) => {
    setEditFormData(prev => ({
      ...prev,
      comment: e.target.value
    }));
  };

  const renderStars = (rating, interactive = false, onStarClick = null) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          style={{
            color: i <= rating ? '#ffc107' : '#e4e5e9',
            fontSize: interactive ? '24px' : '18px',
            cursor: interactive ? 'pointer' : 'default',
            marginRight: '2px',
            transition: 'color 0.2s'
          }}
          onClick={interactive ? () => onStarClick(i) : undefined}
          onMouseEnter={interactive ? (e) => {
            if (i > rating) {
              e.target.style.color = '#ffdb4d';
            }
          } : undefined}
          onMouseLeave={interactive ? (e) => {
            if (i > rating) {
              e.target.style.color = '#e4e5e9';
            }
          } : undefined}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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

  const reviewsContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  };

  const reviewCardStyles = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e9ecef',
    transition: 'transform 0.2s, box-shadow 0.2s',
  };

  const reviewHeaderStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px',
  };

  const productInfoStyles = {
    flex: 1,
  };

  const productNameStyles = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '8px',
  };

  const productDescriptionStyles = {
    fontSize: '14px',
    color: '#666',
    marginBottom: '16px',
    lineHeight: '1.5',
  };

  const ratingContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
  };

  const ratingLabelStyles = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
  };

  const commentStyles = {
    fontSize: '15px',
    color: '#555',
    lineHeight: '1.6',
    marginBottom: '16px',
    padding: '12px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #e9ecef',
  };

  const reviewMetaStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '12px',
    color: '#999',
    borderTop: '1px solid #e9ecef',
    paddingTop: '12px',
  };

  const editButtonStyles = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.2s',
  };

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

  const formGroupStyles = {
    marginBottom: '25px',
  };

  const labelStyles = {
    display: 'block',
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '12px',
  };

  const ratingInputContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
  };

  const textareaStyles = {
    width: '100%',
    minHeight: '120px',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.5',
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

  const loadingStyles = {
    textAlign: 'center',
    padding: '50px',
    fontSize: '18px',
    color: '#666',
  };

  const errorStyles = {
    textAlign: 'center',
    padding: '50px',
    fontSize: '18px',
    color: '#dc3545',
  };

  const emptyStateStyles = {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  };

  const emptyStateTextStyles = {
    fontSize: '18px',
    color: '#666',
    marginBottom: '10px',
  };

  const emptyStateSubtextStyles = {
    fontSize: '14px',
    color: '#999',
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
  if (styleSheet && !document.querySelector('#toast-animation-my-reviews')) {
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
    style.id = 'toast-animation-my-reviews';
    style.textContent = keyframes;
    document.head.appendChild(style);
  }

  if (loading) {
    return <div style={loadingStyles}>Loading your reviews...</div>;
  }

  if (error) {
    return <div style={errorStyles}>{error}</div>;
  }

  return (
    <div style={pageStyles}>
      {/* Header */}
      <div style={headerStyles}>
        <h1 style={titleStyles}>My Reviews</h1>
      </div>

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div style={emptyStateStyles}>
          <div style={emptyStateTextStyles}>No reviews yet</div>
          <div style={emptyStateSubtextStyles}>
            Start shopping and share your experience with others!
          </div>
        </div>
      ) : (
        <div style={reviewsContainerStyles}>
          {reviews.map((review) => (
            <div
              key={review._id}
              style={reviewCardStyles}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={reviewHeaderStyles}>
                <div style={productInfoStyles}>
                  <div style={productNameStyles}>
                    {review.productName}
                  </div>
                  <div style={productDescriptionStyles}>
                    {review.productDescription}
                  </div>
                </div>
                <button
                  style={editButtonStyles}
                  onClick={() => handleEditReview(review)}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#0056b3';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#007bff';
                  }}
                >
                  Edit
                </button>
              </div>

              <div style={ratingContainerStyles}>
                <span style={ratingLabelStyles}>Your Rating:</span>
                <div>{renderStars(review.rating)}</div>
                <span style={{ fontSize: '14px', color: '#666' }}>
                  ({review.rating}/5)
                </span>
              </div>

              <div style={commentStyles}>
                {review.comment}
              </div>

              <div style={reviewMetaStyles}>
                <span>Reviewed on {formatDate(review.createdAt)}</span>
                {review.updatedAt && review.updatedAt !== review.createdAt && (
                  <span>Last edited on {formatDate(review.updatedAt)}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Review Modal */}
      {showEditModal && selectedReview && (
        <div style={modalOverlayStyles} onClick={closeEditModal}>
          <div style={modalStyles} onClick={(e) => e.stopPropagation()}>
            <h2 style={modalHeaderStyles}>Edit Review</h2>

            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: '600', color: '#333' }}>
                {selectedReview.productName}
              </div>
            </div>

            <div style={formGroupStyles}>
              <label style={labelStyles}>Rating</label>
              <div style={ratingInputContainerStyles}>
                <div>{renderStars(editFormData.rating, true, handleRatingChange)}</div>
                <span style={{ fontSize: '16px', color: '#666', marginLeft: '8px' }}>
                  ({editFormData.rating}/5)
                </span>
              </div>
            </div>

            <div style={formGroupStyles}>
              <label style={labelStyles}>Your Review</label>
              <textarea
                value={editFormData.comment}
                onChange={handleCommentChange}
                placeholder="Share your experience with this product..."
                style={textareaStyles}
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

export default MyReviews;