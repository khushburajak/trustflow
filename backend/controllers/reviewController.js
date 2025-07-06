const Review = require('../models/Review');
const Product = require('../models/Product');

// Get all reviews
exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate('user product');
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get reviews for a product
exports.getProductReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.productId, isApproved: true })
            .populate('user', 'username');
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get user's reviews
exports.getUserReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ user: req.user.id }).populate('product');
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Create review
exports.createReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;

        let sentiment = 'neutral';
        if (rating >= 4) sentiment = 'positive';
        else if (rating <= 2) sentiment = 'negative';

        const review = new Review({
            product: productId,
            user: req.user.id,
            rating,
            comment,
            sentiment,
            isApproved: req.user.role === 'admin'
        });

        await review.save();

        await Product.findByIdAndUpdate(productId, { $push: { reviews: review._id } });

        res.status(201).json(review);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update review
exports.updateReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;

        let sentiment = 'neutral';
        if (rating >= 4) sentiment = 'positive';
        else if (rating <= 2) sentiment = 'negative';

        const review = await Review.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { rating, comment, sentiment },
            { new: true }
        );

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.json(review);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete review
exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findOneAndDelete({
            _id: req.params.id,
            $or: [{ user: req.user.id }, { role: 'admin' }]
        });

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        await Product.findByIdAndUpdate(review.product, { $pull: { reviews: review._id } });

        res.json({ message: 'Review deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Approve/reject review (admin only)
exports.moderateReview = async (req, res) => {
    try {
        const { isApproved } = req.body;
        const review = await Review.findByIdAndUpdate(
            req.params.id,
            { isApproved },
            { new: true }
        );

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.json(review);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a single review by ID
exports.getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id)
            .populate('user', 'username email')
            .populate('product', 'name');

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        res.status(200).json({
            success: true,
            data: review
        });

    } catch (err) {
        console.error('Error fetching review:', err);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message
        });
    }
};