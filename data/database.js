const mongodb = require('mongodb');
const logger = require('../logger/logger');

const { MongoClient } = mongodb;

let database;

const connectToDatabase = async () => {
    const client = await MongoClient.connect(process.env.DB_HOST);
    database = client.db(process.env.DB_DATABASE);
};

const getDb = () => {
    if (!database) {
        logger.error(new Error('Devi prima collegarti al database'));
    }

    return database;
};

module.exports = {
    connectToDatabase,
    getDb,
};
