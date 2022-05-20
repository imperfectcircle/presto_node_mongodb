/* eslint-disable import/extensions */
import fs from 'fs';

import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

import buildDevLogger from './dev-logger.js';
import buildProdLogger from './prod-logger.js';

const projectEnv = dotenv.config();
dotenvExpand.expand(projectEnv);

const env = process.env.NODE_ENV;
const logDir = 'logs';

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// eslint-disable-next-line import/no-mutable-exports
let logger = null;
if (env === 'development') {
    logger = buildDevLogger();
} else {
    logger = buildProdLogger();
}

export default logger;
