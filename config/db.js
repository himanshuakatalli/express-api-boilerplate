"use strict";
const mongoose = require('mongoose');
const env = require('./environments');
const { logger } = require('./logger');

if (!logger)
    logger = console.log;

mongoose.Promise = global.Promise;

if (env.NODE_ENV === 'development' || env.DEBUG ===  'true')
    mongoose.set('debug', true);

mongoose.connect(env.DB, env.DB_OPTIONS);

mongoose.connection.on('connected', function () {
    logger.info('Mongoose default connection open to ' + env.DB);
});

mongoose.connection.once('open', () => {
    logger.info('Connected to mongodb!');
});

mongoose.connection.on('error', function(err) {
    logger.error('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    logger.info('Mongoose default connection disconnected');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        logger.warn('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});