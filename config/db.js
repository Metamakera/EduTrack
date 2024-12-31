const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017'; // MongoDB URI
const client = new MongoClient(uri);

const connectToDB = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('StudentDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }
};

module.exports = connectToDB;
