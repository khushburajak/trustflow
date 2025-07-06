import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const productsRes = await axios.get('/api/products');
        setProducts(productsRes.data);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const staticReviews = [
    {
      _id: '1',
      userName: 'RIYA',
      userImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      reviewText: 'The product doesn\'t match the description. Battery drains quickly, and support was unresponsive.',
      rating: 2,
      verified: true
    },
    {
      _id: '2',
      userName: 'ANNA',
      userImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      reviewText: 'Very responsive customer service and fast delivery. Highly recommend this product!',
      rating: 5,
      verified: true
    },
    {
      _id: '3',
      userName: 'MIKE',
      userImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      reviewText: 'Good value for money. Works as expected and arrived quickly.',
      rating: 4,
      verified: false
    },
    {
      _id: '4',
      userName: 'SARAH',
      userImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      reviewText: 'Amazing quality! Exceeded my expectations. Will definitely buy again.',
      rating: 5,
      verified: true
    }
  ];

  const staticTrustScores = [
    {
      _id: '1',
      userName: 'DAVID',
      userImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      trustScore: 9,
      maxScore: 10,
      reviewText: 'EXCELLENT PRODUCT WITH OUTSTANDING CUSTOMER SUPPORT. HIGHLY RECOMMENDED FOR EVERYONE.',
      sentiment: 'POSITIVE',
      sentimentColor: '#28a745'
    },
    {
      _id: '2',
      userName: 'RIYA',
      userImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      trustScore: 6,
      maxScore: 10,
      reviewText: 'THE PRODUCT DOES THE JOB, BUT NOTHING EXCEPTIONAL. DELIVERY WAS ON TIME, BUT THE PACKAGING COULD BE BETTER',
      sentiment: 'NEUTRAL',
      sentimentColor: '#ffc107'
    },
    {
      _id: '3',
      userName: 'ANNA',
      userImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      trustScore: 3,
      maxScore: 10,
      reviewText: 'THE PRODUCT DIDN\'T MATCH THE DESCRIPTION. BATTERY DRAINS QUICKLY, AND SUPPORT WAS UNRESPONSIVE',
      sentiment: 'NEGATIVE',
      sentimentColor: '#dc3545'
    }
  ];

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

  const featuredSectionStyles = {
    padding: '80px 20px',
    backgroundColor: '#f8f9fa',
    textAlign: 'center',
  };

  const sectionTitleStyles = {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  };

  const browseButtonStyles = {
    backgroundColor: 'transparent',
    border: '2px solid #333',
    padding: '10px 25px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginBottom: '50px',
    borderRadius: '5px',
    color: 'black',
  };

  const productsGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const productCardStyles = {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
  };

  const productImageStyles = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '15px',
  };

  const productTitleStyles = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333',
  };

  const productDescriptionStyles = {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.4',
    marginBottom: '15px',
  };

  const trustScoreStyles = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: '15px',
  };

  const productButtonStyles = {
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    fontSize: '12px',
    fontWeight: 'bold',
    cursor: 'pointer',
    borderRadius: '5px',
    textDecoration: 'none',
    display: 'inline-block',
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

  const reviewsGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    maxWidth: '1000px',
    margin: '0 auto',
  };

  const reviewCardStyles = {
    backgroundColor: '#f8f9fa',
    borderRadius: '15px',
    padding: '25px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const starsStyles = {
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

  const trustScoreSectionStyles = {
    padding: '80px 20px',
    backgroundColor: '#f8f9fa',
    textAlign: 'center',
  };

  const trustScoreSubtitleStyles = {
    fontSize: '18px',
    color: '#666',
    marginBottom: '50px',
  };

  const trustScoreGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    maxWidth: '1000px',
    margin: '0 auto',
  };

  const trustScoreCardStyles = {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '25px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const trustScoreValueStyles = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const sentimentStyles = {
    fontSize: '12px',
    fontWeight: 'bold',
    padding: '5px 10px',
    borderRadius: '15px',
    display: 'inline-block',
    marginTop: '10px',
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

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const handleProductClick = (productId) => {
    window.location.href = `/products/${productId}`;
  };

  const handleBrowseProducts = () => {
    window.location.href = '/products';
  };

  if (loading) {
    return <div style={loadingStyles}>Loading products...</div>;
  }

  if (error && products.length === 0) {
    return <div style={errorStyles}>{error}</div>;
  }

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
            onClick={handleBrowseProducts}
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

      {/* Featured Products Section */}
      <section style={featuredSectionStyles}>
        <h2 style={sectionTitleStyles}>FEATURED PRODUCTS</h2>

        <div style={productsGridStyles}>
          {products.slice(0, 4).map(product => (
            <div
              key={product._id}
              style={productCardStyles}
              onClick={() => handleProductClick(product._id)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                style={productImageStyles}
              />
              <h3 style={productTitleStyles}>{product.name}</h3>
              <p style={productDescriptionStyles}>{product.description}</p>
              <p style={trustScoreStyles}>
                Trust Score: {product.trustScore}/10
              </p>
              <a
                href={`/products/${product._id}`}
                style={productButtonStyles}
                onClick={(e) => e.stopPropagation()}
              >
                BROWSE
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section style={reviewsSectionStyles}>
        <h2 style={sectionTitleStyles}>Read Verified Reviews</h2>
        <p style={reviewsSubtitleStyles}>Make smarter decisions with trusted, user-verified feedback !</p>

        <div style={reviewsGridStyles}>
          {staticReviews.slice(0, 3).map(review => (
            <div key={review._id} style={reviewCardStyles}>
              <div style={starsStyles}>
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
                  <span style={{ marginLeft: '10px', color: '#28a745', fontSize: '12px' }}>
                    ✓ Verified
                  </span>
                )}
              </div>
              <p style={reviewTextStyles}>{review.reviewText}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Score Section */}
      <section style={trustScoreSectionStyles}>
        <h2 style={sectionTitleStyles}>TRUST SCORE</h2>
        <p style={trustScoreSubtitleStyles}>A Trust Score You Can Actually Trust !</p>

        <div style={trustScoreGridStyles}>
          {staticTrustScores.slice(0, 3).map(score => (
            <div key={score._id} style={trustScoreCardStyles}>
              <div style={starsStyles}>★★★★★</div>
              <div style={reviewerInfoStyles}>
                <img
                  src={score.userImage || "/placeholder.svg"}
                  alt={score.userName}
                  style={reviewerImageStyles}
                />
                <span style={reviewerNameStyles}>{score.userName}</span>
              </div>
              <div style={trustScoreValueStyles}>
                TRUST SCORE: {score.trustScore}/{score.maxScore}
              </div>
              <p style={reviewTextStyles}>{score.reviewText}</p>
              <span
                style={{
                  ...sentimentStyles,
                  backgroundColor: score.sentimentColor,
                  color: 'white'
                }}
              >
                SENTIMENT: {score.sentiment}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;