import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../../context/AuthContext';

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get('/api/reviews/user', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setReviews(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (user) fetchReviews();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/reviews/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setReviews(reviews.filter(review => review._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="my-reviews">
      <h1>My Reviews</h1>
      {reviews.length === 0 ? (
        <p>You haven't written any reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className="review-card">
            <h3>{review.product.name}</h3>
            <p>Rating: {'★'.repeat(review.rating)}</p>
            <p>{review.comment}</p>
            <div className="actions">
              <button onClick={() => handleDelete(review._id)}>Delete Review</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyReviews;