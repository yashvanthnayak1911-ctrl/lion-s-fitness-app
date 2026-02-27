const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const Feature = require('../models/Feature');

const router = express.Router();

// @route   GET /api/features
// @desc    Get all features
// @access  Public
router.get('/', async (req, res) => {
    try {
        const features = await Feature.find({});
        res.json(features);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/features
// @desc    Create a feature
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
    try {
        const { title, desc, image } = req.body;

        const feature = new Feature({
            title,
            desc,
            image,
            user: req.user._id,
        });

        const createdFeature = await feature.save();
        res.status(201).json(createdFeature);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   DELETE /api/features/:id
// @desc    Delete a feature
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const feature = await Feature.findById(req.params.id);

        if (feature) {
            await feature.deleteOne();
            res.json({ message: 'Feature removed' });
        } else {
            res.status(404).json({ message: 'Feature not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
