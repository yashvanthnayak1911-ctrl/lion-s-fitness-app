const mongoose = require('mongoose');
const User = require('./models/User');

async function makeAdmin() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/lionfitness');
        const user = await User.findOneAndUpdate({ name: 'yash' }, { role: 'admin' }, { new: true });
        console.log('User upgraded to admin:', user ? `${user.name} - ${user.role}` : 'User not found');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

makeAdmin();
