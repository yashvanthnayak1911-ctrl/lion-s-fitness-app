const mongoose = require('mongoose');
const Feature = require('./models/Feature');

async function seed() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/lionfitness');
        await Feature.deleteMany({});
        console.log('cleared');

        let user = await mongoose.connection.collection('users').findOne({ role: 'admin' });
        if (!user) {
            user = await mongoose.connection.collection('users').findOne({});
        }

        if (!user) {
            console.log("No users found to attach features to. Exiting.")
            process.exit(1);
        }

        const features = [
            { title: '24/7 Access to all facilities', desc: 'Train anytime, day or night. Your schedule, your rules.', user: user._id },
            { title: 'Olympic-grade lifting platforms', desc: 'Premium Eleiko bars and bumper plates for serious strength training.', user: user._id },
            { title: 'Sauna, cold plunge & recovery zone', desc: 'Optimize your recovery with contrast therapy and normatec boots.', user: user._id },
            { title: 'Dedicated app for tracking macros & lifts', desc: 'Log your workouts and nutrition all in one place with our custom member app.', user: user._id },
            { title: 'Group fitness & specialty classes', desc: 'From HIIT to Yoga, led by expert instructors to keep you motivated.', user: user._id },
            { title: 'Locker rooms with premium amenities', desc: 'Towel service, high-end grooming products, and secure digital lockers.', user: user._id },
            { title: 'In-house protein and smoothie bar', desc: 'Fuel up post-workout with customizable recovery shakes.', user: user._id }
        ];

        await Feature.insertMany(features);
        console.log('features seeded');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

seed();
