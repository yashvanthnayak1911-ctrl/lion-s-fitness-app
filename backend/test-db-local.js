const mongoose = require('mongoose');

async function testLocalDb() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/lionfitness', { serverSelectionTimeoutMS: 2000 });
        console.log('Successfully connected to local MongoDB!');
        process.exit(0);
    } catch (e) {
        console.error('Failed to connect to local MongoDB:', e.message);
        process.exit(1);
    }
}

testLocalDb();
