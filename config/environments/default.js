"use strict";
const activeAPIs = require('./../api').getActiveAPIS();

module.exports = class DefaultConfig {
    constructor () {
        this.db = process.env.DB;
        this.baseURL= 'http://localhost';
        this.appURL = 'http://localhost:4200';
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