const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const Transaction = require('../models/Transaction');

const router = express.Router();

// @route   GET /api/transactions
// @desc    Get all transactions (Admin only)
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
    try {
        const transactions = await Transaction.find({}).sort({ createdAt: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
