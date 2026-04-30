const mongoose = require('mongoose');

const uri = 'mongodb://Yashh-projects:yashthanu191104@ac-mauhl8l-shard-00-00.u27e8qb.mongodb.net:27017,ac-mauhl8l-shard-00-01.u27e8qb.mongodb.net:27017,ac-mauhl8l-shard-00-02.u27e8qb.mongodb.net:27017/lionfitness?ssl=true&authSource=admin&retryWrites=true&w=majority';

console.log('Testing standard connection string...');
mongoose.connect(uri)
    .then(() => {
        console.log('Connected successfully!');
        process.exit(0);
    })
    .catch((err) => {
        console.error('Connection error:', err);
        process.exit(1);
    });
