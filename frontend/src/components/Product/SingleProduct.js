import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({
    comment: '',
    rating: 0
  });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  useEffect(() => {
    fetchProductData();
  }, [id]);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const [productRes, reviewsRes] = await Promise.all([
        axios.get(`/api/products/${id}`)
      ]);
      
      setProduct(productRes.data);
      setReviews(staticReviews);
      setError(null);
    } catch (err) {
      console.error('Error fetching product data:', err);
      setError('Failed to load product data');
      setReviews(staticReviews);
    } finally {
      setLoading(false);
    }
  };

  const staticReviews = [
    {
      _id: '1',
      userName: 'DAVID',
      userImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      reviewText: 'The product does the job, but nothing exceptional. Delivery was on time, but the packaging could be better.',
      rating: 4,
      verified: true
    },
    {
      _id: '2',
      userName: 'SHREYA',
      userImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      reviewText: 'The product didn\'t match the description. Battery drains quickly, and support was unresponsive.',
      rating: 2,
      verified: true
    },
    {
      _id: '3',
      userName: 'LISA',
      userImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      reviewText: 'Very responsive customer service and fast delivery.',
      rating: 5,
      verified: true
    }
  ];

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

  const handleWriteReview = () => {
    // Check if user is logged in
    const token = localStorage.getItem('authToken');
    if (!token) {
      window.location.href = '/login';
      return;
    }
    
    // Open review modal
    setShowReviewModal(true);
    setReviewData({ comment: '', rating: 0 });
  };

  const handleReviewInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStarClick = (rating) => {
    setReviewData(prev => ({
      ...prev,
      rating: rating
    }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    if (reviewData.rating === 0) {
      showToastMessage('Please select a rating', 'error');
      return;
    }
    
    if (!reviewData.comment.trim()) {
      showToastMessage('Please write a comment', 'error');
      return;
    }

    try {
      setSubmittingReview(true);
      const token = localStorage.getItem('authToken');
      
      const reviewPayload = {
        productId: id,
        comment: reviewData.comment,
        rating: reviewData.rating
      };

      await axios.post('/api/reviews', reviewPayload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      showToastMessage('Review submitted successfully!', 'success');
      setShowReviewModal(false);
      setReviewData({ comment: '', rating: 0 });
      
      // Optionally refresh reviews
      // fetchProductData();
      
    } catch (err) {
      console.error('Error submitting review:', err);
      showToastMessage('Failed to submit review', 'error');
    } finally {
      setSubmittingReview(false);
    }
  };

  const closeReviewModal = () => {
    setShowReviewModal(false);
    setReviewData({ comment: '', rating: 0 });
  };

  const nextReview = () => {
    setCurrentReviewIndex((prev) => 
      prev === reviews.length - 3 ? 0 : prev + 1
    );
  };

  const prevReview = () => {
    setCurrentReviewIndex((prev) => 
      prev === 0 ? Math.max(0, reviews.length - 3) : prev - 1
    );
  };

  const renderStars = (rating) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

  const renderInteractiveStars = (currentRating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        style={{
          fontSize: '24px',
          color: index < currentRating ? '#ffc107' : '#ddd',
          cursor: 'pointer',
          transition: 'color 0.2s'
        }}
        onClick={() => handleStarClick(index + 1)}
        onMouseEnter={(e) => {
          if (index < currentRating) return;
          e.target.style.color = '#ffc107';
        }}
        onMouseLeave={(e) => {
          if (index < currentRating) return;
          e.target.style.color = '#ddd';
        }}
      >
        ★
      </span>
    ));
  };

  // Styles
  const pageStyles = {
    fontFamily: 'Arial, sans-serif',
    margin: 0,
    padding: 0,
  };

  const heroStyles = {
    backgroundImage: 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '500px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
    position: 'relative',
  };

  const heroOverlayStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  };

  const heroContentStyles = {
    position: 'relative',
    zIndex: 1,
  };

  const heroSubtitleStyles = {
    fontSize: '18px',
    marginBottom: '10px',
    fontWeight: '300',
    letterSpacing: '2px',
  };

  const heroTitleStyles = {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '20px',
    lineHeight: '1.2',
  };

  const heroDescriptionStyles = {
    fontSize: '20px',
    marginBottom: '30px',
    fontWeight: '300',
    letterSpacing: '2px',
  };

  const heroButtonStyles = {
    backgroundColor: 'transparent',
    color: 'white',
    border: '2px solid white',
    padding: '15px 30px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    borderRadius: '5px',
    transition: 'all 0.3s ease',
  };

  const singleProductSectionStyles = {
    padding: '80px 20px',
    backgroundColor: 'white',
    textAlign: 'center',
  };

  const sectionTitleStyles = {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '50px',
    color: '#333',
  };

  const productContainerStyles = {
    display: 'flex',
    maxWidth: '1200px',
    margin: '0 auto',
    gap: '60px',
    alignItems: 'flex-start',
  };

  const productImageContainerStyles = {
    flex: '0 0 300px',
  };

  const productImageStyles = {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  };

  const productInfoStyles = {
    flex: 1,
    textAlign: 'left',
    paddingTop: '20px',
  };

  const productNameStyles = {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#333',
  };

  const productDescriptionStyles = {
    fontSize: '16px',
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '20px',
  };

  const trustScoreContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '20px',
  };

  const trustScoreStyles = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  };

  const ratingStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const starsStyles = {
    color: '#ffc107',
    fontSize: '20px',
  };

  const writeReviewButtonStyles = {
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    padding: '15px 30px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    borderRadius: '25px',
    transition: 'background-color 0.3s ease',
    marginTop: '20px',
  };

  const sentimentSectionStyles = {
    padding: '60px 20px',
    backgroundColor: '#f8f9fa',
    textAlign: 'center',
  };

  const sentimentContainerStyles = {
    display: 'flex',
    justifyContent: 'center',
    gap: '60px',
    maxWidth: '1000px',
    margin: '0 auto',
    flexWrap: 'wrap',
  };

  const sentimentChartStyles = {
    textAlign: 'center',
  };

  const chartStyles = {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    margin: '0 auto 15px',
    background: 'conic-gradient(#ef4444 0deg 180deg, #fbbf24 180deg 270deg, #10b981 270deg 360deg)',
  };

  const chartLabelStyles = {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'uppercase',
  };

  const reviewsSectionStyles = {
    padding: '80px 20px',
    backgroundColor: 'white',
    textAlign: 'center',
  };

  const reviewsSubtitleStyles = {
    fontSize: '18px',
    color: '#666',
    marginBottom: '50px',
  };

  const reviewsContainerStyles = {
    position: 'relative',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const reviewsGridStyles = {
    display: 'flex',
    gap: '30px',
    justifyContent: 'center',
    overflow: 'hidden',
  };

  const reviewCardStyles = {
    backgroundColor: '#f8f9fa',
    borderRadius: '15px',
    padding: '25px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    minWidth: '300px',
    flex: '0 0 300px',
  };

  const reviewStarsStyles = {
    color: '#ffc107',
    fontSize: '20px',
    marginBottom: '15px',
  };

  const reviewerInfoStyles = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  };

  const reviewerImageStyles = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '15px',
  };

  const reviewerNameStyles = {
    fontWeight: 'bold',
    fontSize: '16px',
  };

  const reviewTextStyles = {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.5',
  };

  const navButtonStyles = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    cursor: 'pointer',
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s ease',
  };

  const prevButtonStyles = {
    ...navButtonStyles,
    left: '-25px',
  };

  const nextButtonStyles = {
    ...navButtonStyles,
    right: '-25px',
  };

  // Modal Styles
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
    marginBottom: '8px',
    fontWeight: '600',
    color: '#333',
    fontSize: '16px',
  };

  const textareaStyles = {
    width: '100%',
    padding: '12px',
    border: '2px solid #e1e5e9',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    minHeight: '120px',
    resize: 'vertical',
    fontFamily: 'Arial, sans-serif',
    transition: 'border-color 0.2s',
  };

  const ratingContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '8px',
  };

  const modalButtonContainerStyles = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '30px',
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
    disabled: submittingReview,
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
  };

  const errorStyles = {
    textAlign: 'center',
    padding: '50px',
    fontSize: '18px',
    color: '#dc3545',
  };

  // Toast Styles
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

  const closeButtonStyles = {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '18px',
    marginLeft: 'auto',
  };

  // Add keyframes for animation
  const styleSheet = document.styleSheets[0];
  if (styleSheet && !document.querySelector('#toast-animation-single')) {
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
    style.id = 'toast-animation-single';
    style.textContent = keyframes;
    document.head.appendChild(style);
  }

  if (loading) {
    return <div style={loadingStyles}>Loading product...</div>;
  }

  if (error && !product) {
    return <div style={errorStyles}>{error}</div>;
  }

  const currentProduct = product;
  const currentReviews = reviews.length > 0 ? reviews : staticReviews;

  return (
    <div style={pageStyles}>
      {/* Hero Section */}
      <section style={heroStyles}>
        <div style={heroOverlayStyles}></div>
        <div style={heroContentStyles}>
          <p style={heroSubtitleStyles}>FIND PRODUCTS</p>
          <h1 style={heroTitleStyles}>YOU CAN TRUST</h1>
          <p style={heroDescriptionStyles}>VERIFIED REVIEWS AND<br />REAL SENTIMENTS</p>
          <button 
            style={heroButtonStyles}
            onClick={() => window.location.href = '/products'}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.color = '#333';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = 'white';
            }}
          >
            BROWSE PRODUCTS
          </button>
        </div>
      </section>

      {/* Single Product Section */}
      <section style={singleProductSectionStyles}>
        <h2 style={sectionTitleStyles}>SINGLE PRODUCT</h2>
        
        <div style={productContainerStyles}>
          <div style={productImageContainerStyles}>
            <img 
              src={currentProduct.image || "/placeholder.svg"} 
              alt={currentProduct.name}
              style={productImageStyles}
            />
          </div>
          
          <div style={productInfoStyles}>
            <h3 style={productNameStyles}>{currentProduct.name}</h3>
            <p style={productDescriptionStyles}>{currentProduct.description}</p>
            
            <div style={trustScoreContainerStyles}>
              <span style={trustScoreStyles}>
                Trust Score: {currentProduct.trustScore}/10
              </span>
            </div>
            
            <button 
              style={writeReviewButtonStyles}
              onClick={handleWriteReview}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#555';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#333';
              }}
            >
              Write Review
            </button>
          </div>
        </div>
      </section>

      {/* Sentiment Analysis Section */}
      <section style={sentimentSectionStyles}>
        <h2 style={sectionTitleStyles}>SENTIMENT ANALYSIS CHART</h2>
        
        <div style={sentimentContainerStyles}>
          <div style={sentimentChartStyles}>
            <div style={chartStyles}></div>
            <p style={chartLabelStyles}>POSITIVE ANALYSIS<br />CHART</p>
          </div>
          
          <div style={sentimentChartStyles}>
            <div style={chartStyles}></div>
            <p style={chartLabelStyles}>NEUTRAL ANALYSIS<br />CHART</p>
          </div>
          
          <div style={sentimentChartStyles}>
            <div style={chartStyles}></div>
            <p style={chartLabelStyles}>NEGATIVE ANALYSIS<br />CHART</p>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section style={reviewsSectionStyles}>
        <h2 style={sectionTitleStyles}>Customer Verified Reviews</h2>
        <p style={reviewsSubtitleStyles}>Make smarter decisions with trusted, user-verified feedback !</p>
        
        <div style={reviewsContainerStyles}>
          <button 
            style={prevButtonStyles}
            onClick={prevReview}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#555';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#333';
            }}
          >
            ‹
          </button>
          
          <div style={reviewsGridStyles}>
            {currentReviews.slice(currentReviewIndex, currentReviewIndex + 3).map(review => (
              <div key={review._id} style={reviewCardStyles}>
                <div style={reviewStarsStyles}>
                  {renderStars(review.rating)}
                </div>
                <div style={reviewerInfoStyles}>
                  <img 
                    src={review.userImage || "/placeholder.svg"} 
                    alt={review.userName}
                    style={reviewerImageStyles}
                  />
                  <span style={reviewerNameStyles}>{review.userName}</span>
                  {review.verified && (
                    <span style={{marginLeft: '10px', color: '#28a745', fontSize: '12px'}}>
                      ✓
                    </span>
                  )}
                </div>
                <p style={reviewTextStyles}>{review.reviewText}</p>
              </div>
            ))}
          </div>
          
          <button 
            style={nextButtonStyles}
            onClick={nextReview}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#555';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#333';
            }}
          >
            ›
          </button>
        </div>
      </section>

      {/* Write Review Modal */}
      {showReviewModal && (
        <div style={modalOverlayStyles} onClick={closeReviewModal}>
          <div style={modalStyles} onClick={(e) => e.stopPropagation()}>
            <h2 style={modalHeaderStyles}>Write a Review</h2>
            <form onSubmit={handleReviewSubmit}>
              <div style={formGroupStyles}>
                <label style={labelStyles}>Rating</label>
                <div style={ratingContainerStyles}>
                  {renderInteractiveStars(reviewData.rating)}
                  <span style={{ marginLeft: '10px', color: '#666' }}>
                    ({reviewData.rating}/5)
                  </span>
                </div>
              </div>
              
              <div style={formGroupStyles}>
                <label style={labelStyles}>Comment</label>
                <textarea
                  name="comment"
                  value={reviewData.comment}
                  onChange={handleReviewInputChange}
                  style={textareaStyles}
                  placeholder="Share your experience with this product..."
                  required
                  onFocus={(e) => {
                    e.target.style.borderColor = '#007bff';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e1e5e9';
                  }}
                />
              </div>
              
              <div style={modalButtonContainerStyles}>
                <button 
                  type="button" 
                  style={secondaryButtonStyles} 
                  onClick={closeReviewModal}
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
                  type="submit" 
                  style={{
                    ...primaryButtonStyles,
                    opacity: submittingReview ? 0.7 : 1,
                    cursor: submittingReview ? 'not-allowed' : 'pointer'
                  }}
                  disabled={submittingReview}
                  onMouseEnter={(e) => {
                    if (!submittingReview) {
                      e.target.style.backgroundColor = '#0056b3';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!submittingReview) {
                      e.target.style.backgroundColor = '#007bff';
                    }
                  }}
                >
                  {submittingReview ? 'Saving...' : 'Save Review'}
                </button>
              </div>
            </form>
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
        <button onClick={handleCloseToast} style={closeButtonStyles}>
          ×
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;