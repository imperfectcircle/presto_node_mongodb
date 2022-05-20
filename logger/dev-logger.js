/* eslint-disable no-shadow */
import { createLogger, format, transports } from 'winston';

const {
    combine,
    timestamp,
    printf,
    errors,
} = format;

const buildDevLogger = () => {
    const logFormat = printf(({
        level, message, timestamp, stack,
    }) => `${timestamp} - ${level}: ${stack} || ${message}`);

    return createLogger({
        level: 'info',
        format: combine(
            timestamp({
                format: 'DD-MM-YYYY HH:mm:ss',
            }),
            errors({ stack: true }),
            logFormat,
        ),
        transports: [
            new transports.File({ filename: './logs/error.log', level: 'error' }),
            new transports.File({ filename: './logs/combined.log' }),
        ],
    });
};

export default buildDevLogger;
