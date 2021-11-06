const {transports, createLogger, format} = require('winston');

var options = {
    file: {
        level: 'info',
        filename: __dirname+'/../logs/myApp.log',
        handleException: true,
        maxsize: 5242880,
        maxFiles: 5,
        colorize: true
    },
    console: {
        level: 'debug',
        handleException: true,
        colorize: true
    }
};

var Logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.printf(function (info) {
            return `${info.timestamp} - [${info.level}]: ${info.message}`;
        })
    ),
    transports: [
        new transports.File(options.file),
        new transports.Console(options.console)
    ],
    exitOnError: false,
});

module.exports = Logger;
