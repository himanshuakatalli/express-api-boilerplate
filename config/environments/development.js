"use strict";

const activeAPIs = require('./../api').getActiveAPIS();
const DefaultConfig = require('./default');

module.exports = class DevelopmentConfig extends DefaultConfig {

    constructor () {
        super();
        this.db = process.env.DB_DEV;
        this.baseURL = process.env.BASE_URL_PROD;
        this.apiURL = {};
        activeAPIs.forEach(version => this.apiURL[version] = `${this.baseURL}/api/${version}`);
    }
};