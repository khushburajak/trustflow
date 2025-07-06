import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState({ rating: 5, comment: '' });
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`/api/reviews/product/${id}`);
        setReviews(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    
    fetchProduct();
    fetchReviews();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        '/api/reviews',
        { productId: id, ...review },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
      setReviews([...reviews, res.data]);
      setReview({ rating: 5, comment: '' });
    } catch (err) {
      console.error(err);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="single-product">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Specifications: {product.specifications}</p>
      <p>Trust Score: {product.trustScore}/10</p>
      
      <div className="sentiment-chart">
        <h2>Sentiment Analysis Chart</h2>
        {/* Chart would be implemented here */}
      </div>
      
      <div className="reviews">
        <h2>Customer Verified Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((r) => (
            <div key={r._id} className="review">
              <p>{'★'.repeat(r.rating)}</p>
              <p>{r.comment}</p>
              <p>By: {r.user.username}</p>
            </div>
          ))
        )}
      </div>
      
      {user && (
        <div className="review-form">
          <h3>Write Review</h3>
          <form onSubmit={handleReviewSubmit}>
            <div className="form-group">
              <label>Rating</label>
              <select
                value={review.rating}
                onChange={(e) => setReview({ ...review, rating: e.target.value })}
              >
                <option value="5">5★</option>
                <option value="4">4★</option>
                <option value="3">3★</option>
                <option value="2">2★</option>
                <option value="1">1★</option>
              </select>
            </div>
            <div className="form-group">
              <label>Comment</label>
              <textarea
                value={review.comment}
                onChange={(e) => setReview({ ...review, comment: e.target.value })}
                required
              />
            </div>
            <button type="submit">Submit Review</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;