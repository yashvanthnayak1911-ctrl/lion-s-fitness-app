const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'member' }, // 'member' or 'admin'
    subscriptionStatus: { type: String, default: 'inactive' }, // 'inactive', 'active'
    subscriptionPlan: { type: String, default: 'none' }, // 'Gold', 'Premium', etc.
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
