import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: 'All',
    trustScore: 0,
    sentiment: '',
    rating: 0
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products', {
          params: filters
        });
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="product-list">
      <h1>Browse Products</h1>
      
      <div className="filters">
        <div className="filter-group">
          <label>Categories</label>
          <select name="category" onChange={handleFilterChange}>
            <option value="All">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home and Kitchen">Home and Kitchen</option>
            <option value="Health and Beauty">Health and Beauty</option>
            <option value="Books">Books</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Trust Score</label>
          <input
            type="range"
            name="trustScore"
            min="0"
            max="10"
            value={filters.trustScore}
            onChange={handleFilterChange}
          />
          <span>{filters.trustScore}</span>
        </div>
        
        <div className="filter-group">
          <label>Sentiment</label>
          <select name="sentiment" onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Rating</label>
          <select name="rating" onChange={handleFilterChange}>
            <option value="0">All</option>
            <option value="5">5★</option>
            <option value="4">4★ & Up</option>
            <option value="3">3★ & Up</option>
          </select>
        </div>
      </div>
      
      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Trust Score: {product.trustScore}/10</p>
            <a href={`/products/${product._id}`}>View Details</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;