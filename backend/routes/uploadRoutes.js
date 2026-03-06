const path = require('path');
const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'lionfitness',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'gif'],
    },
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No image uploaded');
    }
    // Cloudinary returns the full URL in req.file.path
    res.send(req.file.path);
});

module.exports = router;
