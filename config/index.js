"use strict";

const activeAPIs = require('./api').getActiveAPIS();
require('./utils').preloadAPIFiles(activeAPIs);

const db = require('./database');
const expressApp = require('./express');
const envConfig = require('./environments');

const activeRouters = require('./../routers').getConfiguredRoutersFor(activeAPIs);

module.exports = function (app) {
    
    db.configure(envConfig);

    expressApp
        .setupApp(app)
        .setupRouters(app, activeRouters)
};