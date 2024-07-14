const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

// Define the custom log format
const logFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

// Logger for reload service
const loggerReload = createLogger({
    format: combine(
        label({ label: 'reload-service' }),
        timestamp(),
        logFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/reload.log' })
    ]
});

// Logger for Daraz winning messages
const loggerDaraz = createLogger({
    format: combine(
        label({ label: 'daraz-winning-service' }),
        timestamp(),
        logFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/daraz-winning.log' })
    ]
});

// Logger for SMS service
const loggerSMS = createLogger({
    format: combine(
        label({ label: 'sms-service' }),
        timestamp(),
        logFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/sms.log' })
    ]
});

const LoggerReloadSMS = createLogger({
    format: combine(
        label({ label: 'sms-service-reload' }),
        timestamp(),
        logFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/reload-sms.log' })
    ]
});

module.exports = {
    loggerReload,
    loggerSMS,
    loggerDaraz,
    LoggerReloadSMS
};
