"use strict";
const dbConfig = require('./config.js');
const seeders = require('./seeds');

const self = module.exports = {
    configure (envConfig) {
        dbConfig(envConfig, self);
    },

    seed(common = true) {
		seeders.run(common, null);
	}
};