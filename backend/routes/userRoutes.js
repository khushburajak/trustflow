const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// User routes
router.get('/profile', auth, userController.getUserProfile);
router.put('/profile', auth, userController.updateUserProfile);
router.put('/change-password', auth, userController.changePassword);

// Admin routes
router.get('/', auth, admin, userController.getAllUsers);
router.delete('/:id', auth, admin, userController.deactivateUser);

module.exports = router;