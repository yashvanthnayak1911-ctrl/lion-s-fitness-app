const mongoose = require('mongoose');
const Feature = require('./backend/models/Feature');

mongoose.connect('mongodb://127.0.0.1:27017/lionfitness').then(async () => {
    await Feature.deleteMany({});
    console.log('cleared');

    const adminUser = await mongoose.connection.collection('users').findOne({ role: 'admin' });

    const features = [
        { title: '24/7 Access to all facilities', desc: 'Train anytime, day or night. Your schedule, your rules.', user: adminUser._id },
        { title: 'Olympic-grade lifting platforms', desc: 'Premium Eleiko bars and bumper plates for serious strength training.', user: adminUser._id },
        { title: 'Sauna, cold plunge & recovery zone', desc: 'Optimize your recovery with contrast therapy and normatec boots.', user: adminUser._id },
        { title: 'Dedicated app for tracking macros & lifts', desc: 'Log your workouts and nutrition all in one place with our custom member app.', user: adminUser._id },
        { title: 'Group fitness & specialty classes', desc: 'From HIIT to Yoga, led by expert instructors to keep you motivated.', user: adminUser._id },
        { title: 'Locker rooms with premium amenities', desc: 'Towel service, high-end grooming products, and secure digital lockers.', user: adminUser._id },
        { title: 'In-house protein and smoothie bar', desc: 'Fuel up post-workout with customizable recovery shakes.', user: adminUser._id }
    ];

    await Feature.insertMany(features);
    console.log('features seeded');
    process.exit();
}).catch(e => console.error(e));
