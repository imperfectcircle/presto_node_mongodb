/* eslint-disable import/extensions */
import mongodb from 'mongodb';
import logger from '../logger/logger.js';

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

export {
    connectToDatabase,
    getDb,
};
