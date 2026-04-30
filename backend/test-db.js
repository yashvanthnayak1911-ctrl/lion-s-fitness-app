const mongoose = require('mongoose');

const uri = 'mongodb+srv://Yashh-projects:yashthanu191104@cluster0.u27e8qb.mongodb.net/lionfitness?retryWrites=true&w=majority';

console.log('Testing connection to MongoDB...');
mongoose.connect(uri)
    .then(() => {
        console.log('Connected successfully!');
        process.exit(0);
    })
    .catch((err) => {
        console.error('Connection error:', err);
        process.exit(1);
    });
