"use strict";

const activeAPIs = require('../config/api').getActiveAPIS();
require('../config/utils').preloadAPIFiles(activeAPIs);
require('dotenv').config();

const parseArgs = require('minimist');
const mongoose = require('mongoose');
const seeders = require('./seeds');
const envConfig = require('../config/environments');

mongoose.Promise = global.Promise;

let additionalSeeds = parseArgs(process.argv.splice(2))['_'];

const RESET_DB = (function () {
    let indexOfReset = additionalSeeds.indexOf('reset');
    if (indexOfReset >= 0) {
        additionalSeeds.splice(indexOfReset, 1);
        return true;
    }
    return false;
})();

const _resetDB = function () {
    return new Promise(function (resolve, reject) {
        for (let collectionName in mongoose.connection.collections) {
            mongoose.connection.collections[collectionName]
                .drop(error => console.log('Dropping collection  ' + collectionName));
        }
        setTimeout(resolve(), 3000);
    });
};

mongoose.set('debug', true);

mongoose.connect(envConfig.db, envConfig.dbOptions);

mongoose.connection.on('connected', async function () {
    console.info(`Connected to mongoose on ${envConfig.db}`);
    if (RESET_DB) {
        await _resetDB();
        seeders.run(additionalSeeds.length ? additionalSeeds : null)
            .then(function () {
                mongoose.connection.close(function () {
                    console.log('Mongoose default connection disconnected post seeding');
                    process.exit(0);
                });
            });
    }

    else
        seeders.run(additionalSeeds.length ? additionalSeeds : null)
            .then(function () {
                mongoose.connection.close(function () {
                    console.log('Mongoose default connection disconnected post seeding');
                    process.exit(0);
                });
            });
});