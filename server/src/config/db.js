const mongoose = require('mongoose');


module.exports = async function createDatabaseConnection() {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error('MONGO_URI not provided in environment');


    mongoose.set('strictQuery', true);
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
};