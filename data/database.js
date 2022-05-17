require('dotenv').config();

const mongodb = require('mongodb');

const { MongoClient } = mongodb;

let database;

const connectToDatabase = async () => {
    const client = await MongoClient.connect(process.env.DB_HOST);
    database = client.db(process.env.DB_DATABASE);
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
