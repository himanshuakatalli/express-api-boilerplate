"use strict";
const dbConfig = require('./config.js');

const self = module.exports = {
    configure (envConfig) {
        dbConfig(envConfig, self);
    }
};