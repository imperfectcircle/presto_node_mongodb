const mongodb = require('mongodb');

const { MongoClient } = mongodb;

let database;

const connectToDatabase = async () => {
    const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
    database = client.db('presto-shop');
};

const getDb = () => {
    if (!database) {
        throw new Error('Devi prima collegarti al database');
    }

    return database;
};

module.exports = {
    connectToDatabase,
    getDb,
};
