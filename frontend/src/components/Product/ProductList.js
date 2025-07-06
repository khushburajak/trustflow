import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BrowseProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    categories: [],
    trustScore: [0, 10],
    sentiment: [],
    rating: []
  });

  const categories = ['All', 'Electronics', 'Fashion', 'Home and Kitchen', 'Healthy and Beauty', 'Books', 'Accessories'];
  const sentiments = ['Positive', 'Neutral', 'Negative'];
  const ratings = ['5★', '4★ & Up', '3★ & Up'];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/products');
      setProducts(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    if (filters.categories.length > 0 && !filters.categories.includes('All')) {
      filtered = filtered.filter(product =>
        filters.categories.includes(product.category)
      );
    }

    filtered = filtered.filter(product =>
      product.trustScore >= filters.trustScore[0] &&
      product.trustScore <= filters.trustScore[1]
    );

    if (filters.sentiment.length > 0) {
      filtered = filtered.filter(product =>
        filters.sentiment.includes(product.sentiment)
      );
    }

    if (filters.rating.length > 0) {
      filtered = filtered.filter(product => {
        const rating = Math.floor(product.rating);
        return filters.rating.some(filterRating => {
          if (filterRating === '5★') return rating === 5;
          if (filterRating === '4★ & Up') return rating >= 4;
          if (filterRating === '3★ & Up') return rating >= 3;
          return false;
        });
      });
    }

    setFilteredProducts(filtered);
  };

  const handleFilterChange = (filterType, value, checked) => {
    setFilters(prev => {
      const newFilters = { ...prev };

      if (filterType === 'categories' || filterType === 'sentiment' || filterType === 'rating') {
        if (checked) {
          newFilters[filterType] = [...prev[filterType], value];
        } else {
          newFilters[filterType] = prev[filterType].filter(item => item !== value);
        }
      } else if (filterType === 'trustScore') {
        newFilters[filterType] = value;
      }

      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      trustScore: [0, 10],
      sentiment: [],
      rating: []
    });
  };

  const handleProductClick = (productId) => {
    window.location.href = `/products/${productId}`;
  };

  const renderStars = (rating) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

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

  const mainSectionStyles = {
    padding: '60px 20px',
    backgroundColor: 'white',
  };

  const sectionTitleStyles = {
    fontSize: '36px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '50px',
    color: '#333',
  };

  const contentContainerStyles = {
    display: 'flex',
    maxWidth: '1400px',
    margin: '0 auto',
    gap: '40px',
  };

  const sidebarStyles = {
    flex: '0 0 280px',
    backgroundColor: '#f8f9fa',
    padding: '30px',
    borderRadius: '8px',
    height: 'fit-content',
  };

  const filterHeaderStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  };

  const filterTitleStyles = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  };

  const clearAllStyles = {
    color: '#dc3545',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  };

  const filterSectionStyles = {
    marginBottom: '30px',
  };

  const filterSectionTitleStyles = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const checkboxContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  };

  const checkboxItemStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const checkboxStyles = {
    width: '16px',
    height: '16px',
    cursor: 'pointer',
  };

  const labelStyles = {
    fontSize: '14px',
    color: '#555',
    cursor: 'pointer',
  };

  const productsContainerStyles = {
    flex: 1,
  };

  const productsHeaderStyles = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '30px',
    textAlign: 'center',
  };

  const productsGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '30px',
  };

  const productCardStyles = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  };

  const productImageStyles = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '15px',
  };

  const productNameStyles = {
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
    height: '60px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const productStatsStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '15px',
  };

  const trustScoreStyles = {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#28a745',
  };

  const ratingStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
  };

  const starsStyles = {
    color: '#ffc107',
    fontSize: '16px',
  };

  const browseButtonStyles = {
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'background-color 0.3s ease',
    width: '100%',
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

  const noProductsStyles = {
    textAlign: 'center',
    padding: '50px',
    fontSize: '18px',
    color: '#666',
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

      {/* Main Content */}
      <section style={mainSectionStyles}>
        <h2 style={sectionTitleStyles}>BROWSE PRODUCTS</h2>

        <div style={contentContainerStyles}>
          {/* Sidebar Filters */}
          <div style={sidebarStyles}>
            <div style={filterHeaderStyles}>
              <span style={filterTitleStyles}>FILTER</span>
              <span
                style={clearAllStyles}
                onClick={clearAllFilters}
                onMouseEnter={(e) => {
                  e.target.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.target.style.textDecoration = 'none';
                }}
              >
                CLEAR ALL
              </span>
            </div>

            {/* Categories Filter */}
            <div style={filterSectionStyles}>
              <div style={filterSectionTitleStyles}>
                <span>CATEGORIES</span>
                <span>-</span>
              </div>
              <div style={checkboxContainerStyles}>
                {categories.map(category => (
                  <div key={category} style={checkboxItemStyles}>
                    <input
                      type="checkbox"
                      id={`category-${category}`}
                      style={checkboxStyles}
                      checked={filters.categories.includes(category)}
                      onChange={(e) => handleFilterChange('categories', category, e.target.checked)}
                    />
                    <label htmlFor={`category-${category}`} style={labelStyles}>
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Sentiment Filter */}
            <div style={filterSectionStyles}>
              <div style={filterSectionTitleStyles}>
                <span>SENTIMENT</span>
                <span>+</span>
              </div>
              <div style={checkboxContainerStyles}>
                {sentiments.map(sentiment => (
                  <div key={sentiment} style={checkboxItemStyles}>
                    <input
                      type="checkbox"
                      id={`sentiment-${sentiment}`}
                      style={checkboxStyles}
                      checked={filters.sentiment.includes(sentiment)}
                      onChange={(e) => handleFilterChange('sentiment', sentiment, e.target.checked)}
                    />
                    <label htmlFor={`sentiment-${sentiment}`} style={labelStyles}>
                      {sentiment}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div style={filterSectionStyles}>
              <div style={filterSectionTitleStyles}>
                <span>RATING</span>
                <span>+</span>
              </div>
              <div style={checkboxContainerStyles}>
                {ratings.map(rating => (
                  <div key={rating} style={checkboxItemStyles}>
                    <input
                      type="checkbox"
                      id={`rating-${rating}`}
                      style={checkboxStyles}
                      checked={filters.rating.includes(rating)}
                      onChange={(e) => handleFilterChange('rating', rating, e.target.checked)}
                    />
                    <label htmlFor={`rating-${rating}`} style={labelStyles}>
                      {rating}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div style={productsContainerStyles}>
            <h3 style={productsHeaderStyles}>PRODUCTS</h3>

            {filteredProducts.length === 0 ? (
              <div style={noProductsStyles}>
                No products found matching your filters.
              </div>
            ) : (
              <div style={productsGridStyles}>
                {filteredProducts.map(product => (
                  <div
                    key={product._id}
                    style={productCardStyles}
                    onClick={() => handleProductClick(product._id)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      style={productImageStyles}
                    />
                    <h4 style={productNameStyles}>{product.name}</h4>
                    <p style={productDescriptionStyles}>{product.description}</p>

                    <div style={productStatsStyles}>
                      <div style={trustScoreStyles}>
                        Trust Score: {product.trustScore}/10
                      </div>
                      <div style={ratingStyles}>
                        <span style={starsStyles}>
                          {renderStars(product.rating)}
                        </span>
                        <span style={{ fontSize: '14px', color: '#666' }}>
                          Rating
                        </span>
                      </div>
                    </div>

                    <button
                      style={browseButtonStyles}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(product._id);
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#555';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#333';
                      }}
                    >
                      BROWSE
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrowseProducts;