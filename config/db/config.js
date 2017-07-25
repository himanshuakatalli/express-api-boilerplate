"use strict";
const mongoose = require('mongoose');

module.exports = function (envConfig, self) {

    mongoose.Promise = global.Promise;
    
    if (process.env.ENV === 'development')
        mongoose.set('debug', true);

    mongoose.connect(envConfig.db, envConfig.dbOptions);

    mongoose.connection.on('connected', function () {
        console.log('Mongoose default connection open to ' + envConfig.db);
    });

    mongoose.connection.once('open', () => {
        console.log('Connected to mongodb!');
    });

    mongoose.connection.on('error', function(err) {
        console.error('Mongoose default connection error: ' + err);
    });

    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
    });

    process.on('SIGINT', function() {
        mongoose.connection.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
}