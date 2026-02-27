const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User');

const router = express.Router();

// @route   POST /api/subscriptions
// @desc    Update user subscription status (mock payment)
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const { planName, paymentDetails } = req.body;

        // In a real app, you would integrate Stripe/Razorpay here using paymentDetails
        console.log(`Processing mock payment for ${req.user.name}:`, paymentDetails);

        const user = await User.findById(req.user._id);

        if (user) {
            user.subscriptionStatus = 'active';
            user.subscriptionPlan = planName;

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                subscriptionStatus: updatedUser.subscriptionStatus,
                subscriptionPlan: updatedUser.subscriptionPlan,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
