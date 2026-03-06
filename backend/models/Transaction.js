const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    planName: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentStatus: { type: String, default: 'completed' }, // 'completed', 'failed', 'pending'
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
