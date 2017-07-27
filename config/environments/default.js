"use strict";
const activeAPIs = require('./../api').getActiveAPIS();

module.exports = class DefaultConfig {
    constructor () {
        this.db = process.env.DB;
        this.auth = {
            key: process.env.AUTH_KEY || 'imsbasic',
            pass: process.env.AUTH_PASS || process.env.SECRET
        };
        this.baseURL= process.env.BASE_URL || 'http://localhost';
        this.apiURL = {};

        activeAPIs.forEach(version => this.apiURL[version] = `${this.baseURL}/api/${version}`);

        this.dbOptions = {
            promiseLibrary: global.Promise,
            server: {
                socketOptions: {
                    keepAlive: 300000,
                    connectTimeoutMS: 30000
                }
            }
        };
    }
};