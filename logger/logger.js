const fs = require('fs');

const buildDevLogger = require('./dev-logger');
const buildProdLogger = require('./prod-logger');

const env = process.env.NODE_ENV;
const logDir = 'logs';

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

let logger = null;
if (env === 'development') {
    logger = buildDevLogger();
} else {
    logger = buildProdLogger();
}

module.exports = logger;
