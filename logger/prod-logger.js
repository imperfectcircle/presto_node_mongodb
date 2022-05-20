import { createLogger, format, transports } from 'winston';

const {
    combine,
    timestamp,
    errors,
    json,
} = format;

const buildProdLogger = () => createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        errors({ stack: true }),
        json(),
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        new transports.File({ filename: './logs/error.log', level: 'error' }),
        new transports.File({ filename: './logs/combined.log' }),
    ],
});

export default buildProdLogger;
