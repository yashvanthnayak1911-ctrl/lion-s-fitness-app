const mongoose = require('mongoose');

const featureSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: '',
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        }
    },
    {
        timestamps: true,
    }
);

const Feature = mongoose.model('Feature', featureSchema);

module.exports = Feature;
