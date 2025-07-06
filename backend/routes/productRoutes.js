const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { upload } = require('../server');

// Public routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Admin routes with file upload capability
router.post('/', auth, admin, upload.single('image'), productController.createProduct);
router.put('/:id', auth, admin, upload.single('image'), productController.updateProduct);
router.delete('/:id', auth, admin, productController.deleteProduct);

module.exports = router;