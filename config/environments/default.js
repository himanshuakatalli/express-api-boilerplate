"use strict";

const join  = require('path').join;

exports.ROOT_DIR = join(__dirname, '/../..');
exports.LOG_DIR = process.env.LOG_DIR || `${exports.ROOT_DIR}/config/logger/logs`;
exports.LOG_LEVEL = process.env.LOG_LEVEL;
exports.NODE_ENV = process.env.NODE_ENV;
exports.DEBUG = process.env.DEBUG;
exports.PORT = process.env.PORT;
exports.DB = process.env.DB;
exports.DB_OPTIONS = {
    promiseLibrary: global.Promise,
    server: {
        socketOptions: {
            keepAlive: 300000,
            connectTimeoutMS: 30000
        }
    }
};
exports.ACTIVE_APIS = process.env.ACTIVE_APIS || 'v1';