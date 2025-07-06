import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get('/api/reviews', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setReviews(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReviews();
  }, []);

  const handleModerate = async (id, isApproved) => {
    try {
      await axios.put(
        `/api/reviews/${id}/moderate`,
        { isApproved },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
      setReviews(reviews.map(review => 
        review._id === id ? { ...review, isApproved } : review
      ));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="manage-reviews">
      <h1>Manage Reviews</h1>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Review</th>
            <th>Rating</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review._id}>
              <td>{review.product.name}</td>
              <td>{review.comment}</td>
              <td>{'★'.repeat(review.rating)}</td>
              <td>{review.isApproved ? 'Approved' : 'Pending'}</td>
              <td>
                <button onClick={() => handleModerate(review._id, true)}>
                  Approve
                </button>
                <button onClick={() => handleModerate(review._id, false)}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageReviews;