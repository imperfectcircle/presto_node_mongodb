/* eslint-disable import/extensions */
import logger from '../logger/logger.js';

const errorHandler = (error, req, res, next) => {
    logger.error(error);

    if (error.code === 404) {
        return res.status(404)
            .render('shared/404');
    }

    res.status(500)
        .render('shared/500');
    return next();
};

export default errorHandler;
