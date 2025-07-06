import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../../context/AuthContext';

const SavedProducts = () => {
  const [savedProducts, setSavedProducts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchSavedProducts = async () => {
      try {
        const res = await axios.get('/api/users/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setSavedProducts(res.data.savedProducts);
      } catch (err) {
        console.error(err);
      }
    };
    if (user) fetchSavedProducts();
  }, [user]);

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`/api/users/remove-product/${productId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setSavedProducts(savedProducts.filter(id => id !== productId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="saved-products">
      <h1>Saved Products</h1>
      {savedProducts.length === 0 ? (
        <p>You haven't saved any products yet.</p>
      ) : (
        savedProducts.map((product) => (
          <div key={product._id} className="product-card">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Trust Score: {product.trustScore}/10</p>
            <div className="actions">
              <a href={`/products/${product._id}`}>View Product</a>
              <button onClick={() => handleRemove(product._id)}>Remove</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedProducts;