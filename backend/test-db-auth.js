const mongoose = require('mongoose');

const uris = [
    'mongodb://Yashh-projects:yashthanu191104@ac-mauhl8l-shard-00-00.u27e8qb.mongodb.net:27017,ac-mauhl8l-shard-00-01.u27e8qb.mongodb.net:27017,ac-mauhl8l-shard-00-02.u27e8qb.mongodb.net:27017/?ssl=true&authSource=admin&retryWrites=true&w=majority',
    'mongodb+srv://Yashh-projects:yashthanu191104@cluster0.u27e8qb.mongodb.net/'
];

async function testConnections() {
    for (let i = 0; i < uris.length; i++) {
        console.log(`\nTesting URI ${i + 1}...`);
        try {
            await mongoose.connect(uris[i], { serverSelectionTimeoutMS: 5000 });
            console.log(`URI ${i + 1} Connected successfully!`);
            await mongoose.disconnect();
        } catch (err) {
            console.error(`URI ${i + 1} Connection error:`, err.message);
        }
    }
}

testConnections();
