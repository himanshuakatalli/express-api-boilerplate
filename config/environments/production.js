"use strict";

const activeAPIs = require('./../api').getActiveAPIS();
const DefaultConfig = require('./default');

module.exports = class ProductionConfig extends DefaultConfig {

    constructor () {
        super();
        this.db = process.env.DB_PROD;
        this.baseURL = process.env.BASE_URL_PROD;
        this.apiURL = {};

        activeAPIs.forEach(version => this.apiURL[version] = `${this.baseURL}/api/${version}`);
        this.dbOptions = {
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
        }
    }
};