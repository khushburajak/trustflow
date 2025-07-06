const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../controllers/authController');
// const admin = require('../middleware/admin');

// User routes
router.get('/profile', auth, userController.getUserProfile);
router.put('/profile', auth, userController.updateUserProfile);
router.put('/change-password', auth, userController.changePassword);
router.post('/save-product/:productId', auth, userController.saveProduct);
router.delete('/remove-product/:productId', auth, userController.removeSavedProduct);

// Admin routes
// router.get('/', auth, admin, userController.getAllUsers);
// router.delete('/:id', auth, admin, userController.deactivateUser);

module.exports = router;