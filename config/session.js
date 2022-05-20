import expressSession from 'express-session';

import mongodbStore from 'connect-mongodb-session';

const createSessionStore = () => {
    const MongoDBStore = mongodbStore(expressSession);

    const store = new MongoDBStore({
        uri: process.env.DB_HOST,
        databaseName: process.env.DB_DATABASE,
        collection: 'sessions',
    });

    return store;
};

// eslint-disable-next-line arrow-body-style
const createSessionConfig = () => {
    return {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: createSessionStore(),
        cookie: {
            maxAge: 30 * 24 * 60 * 60 * 1000,
        },
    };
};

export default createSessionConfig;
