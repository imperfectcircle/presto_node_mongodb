const expressSession = require('express-session');

const mongodbStore = require('connect-mongodb-session');

const createSessionStore = () => {
    const MongoDBStore = mongodbStore(expressSession);

    const store = new MongoDBStore({
        uri: 'mongodb://127.0.0.1:27017',
        database: 'presto-shop',
        collection: 'sessions',
    });

    return store;
};

// eslint-disable-next-line arrow-body-style
const createSessionConfig = () => {
    return {
        secret: '恋したい恋したい恋したい季節が来る。君の事見つけた渡り廊下。振り向く振り向く目が合うその瞬間僕はもう走り出している',
        resave: false,
        saveUninitialized: false,
        store: createSessionStore(),
        cookie: {
            maxAge: 30 * 24 * 60 * 60 * 1000,
        },
    };
};

module.exports = createSessionConfig;
