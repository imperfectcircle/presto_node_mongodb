const logger = require('../logger/logger');

const errorHandler = (error, req, res, next) => {
    logger.error(error);
    res.status(500)
        .render('shared/500');
    return next();
};

module.exports = errorHandler;
