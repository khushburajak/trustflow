const Product = require('../models/Product');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('reviews');
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get single product
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('reviews');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Create product (admin only)
exports.createProduct = async (req, res) => {
    try {
        const { name, description, category, specifications } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
        const product = new Product({ 
            name, 
            description, 
            category, 
            specifications,
            image: imageUrl
        });
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update product (admin only)
exports.updateProduct = async (req, res) => {
    try {
        const { name, description, category, specifications } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { 
                name, 
                description, 
                category, 
                specifications,
                image: imageUrl
            },
            { new: true }
        );
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Delete product (admin only)
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};