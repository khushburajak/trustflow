const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Electronics', 'Fashion', 'Home and Kitchen', 'Health and Beauty', 'Books', 'Accessories'],
        required: true
    },
    specifications: {
        type: String
    },
    trustScore: {
        type: Number,
        default: 0
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);