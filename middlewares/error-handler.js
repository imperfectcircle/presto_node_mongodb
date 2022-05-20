/* eslint-disable import/extensions */
import logger from '../logger/logger.js';

const errorHandler = (error, req, res, next) => {
    logger.error(error);
    res.status(500)
        .render('shared/500');
    return next();
};

export default errorHandler;
