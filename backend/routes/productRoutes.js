const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../controllers/authController');
// const admin = require('../controllers/adminController');

// Public routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Admin routes
// router.post('/', auth, admin, productController.createProduct);
// router.put('/:id', auth, admin, productController.updateProduct);
// router.delete('/:id', auth, admin, productController.deleteProduct);

module.exports = router;