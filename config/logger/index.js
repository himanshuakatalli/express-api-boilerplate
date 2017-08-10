"use strict";

const fs = require('fs');
const env = require('../environments');
var winston = require('winston');
const expressWinston = require('express-winston');
require('winston-daily-rotate-file');

if (!fs.existsSync(env.LOG_DIR))
    fs.mkdirSync(env.LOG_DIR);

const transportOptions = {
    colorize: true,
    timestamp: true
};

exports.logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(
            Object.assign({
                level: env.LOG_LEVEL
            },transportOptions)
        ),

        new (winston.transports.DailyRotateFile)(
            Object.assign({}, transportOptions, {
                level: 'error',
                filename: `${env.LOG_DIR}/errors.log`,
                prepend: true,
                maxFiles: 5,
                compress: true,
                colorize: false
            })
        )
    ]
});

exports.expressLogger = expressWinston.logger({
    transports: [
        new (winston.transports.DailyRotateFile)(
            Object.assign({}, transportOptions, {
                filename: `${env.LOG_DIR}/express.log`,
                prepend: true,
                maxFiles: 5,
                compress: true,
                colorize: false
            })
        )
    ]
});