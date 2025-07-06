const User = require('../models/User');

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
    try {
        const { username, phone } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { username, phone },
            { new: true }
        ).select('-password');
        
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Change password
exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id);
        
        // Check old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid old password' });
        }
        
        // Hash new password
        user.password = newPassword;
        await user.save();
        
        res.json({ message: 'Password changed successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Deactivate user (admin only)
exports.deactivateUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deactivated' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Save product to user's list
exports.saveProduct = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $addToSet: { savedProducts: req.params.productId } },
            { new: true }
        ).select('-password');
        
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Remove saved product
exports.removeSavedProduct = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $pull: { savedProducts: req.params.productId } },
            { new: true }
        ).select('-password');
        
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};