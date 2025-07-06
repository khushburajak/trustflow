const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Public routes
router.get('/product/:productId', reviewController.getProductReviews);
router.get('/reviews', reviewController.getAllReviews);

// User routes
router.get('/user', auth, reviewController.getUserReviews);
router.post('/', auth, reviewController.createReview);
router.get('/:id', auth, reviewController.getReviewById);
router.put('/:id', auth, reviewController.updateReview);
router.delete('/:id', auth, reviewController.deleteReview);

// Admin routes
router.get('/', auth, admin, reviewController.getAllReviews);
router.put('/:id/moderate', auth, admin, reviewController.moderateReview);

module.exports = router;