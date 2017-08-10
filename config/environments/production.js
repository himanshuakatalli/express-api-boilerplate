"use strict";

exports.DB = process.env.DB_PROD
exports.DB_OPTIONS = {
    promiseLibrary: global.Promise,
    server: {
        poolSize: 100,
        socketOptions: {
            keepAlive: 300000,
            connectTimeoutMS: 30000
        }
    },

    replset: {
        poolSize: 100,
        socketOptions: {
            eepAlive: 300000,
            connectTimeoutMS: 30000
        }
    }
};