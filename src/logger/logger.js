const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

// Define the custom log format
const logFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

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

module.exports = loggerReload;
