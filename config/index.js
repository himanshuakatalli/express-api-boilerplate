"use strict";

require('dotenv').config();
require('./db');

const appConfig = require('./express');
appConfig.preloadAPIFiles();

const { getConfiguredRouters } = require('./express/route-configurator');

exports.init = function (app) {

    const ACTIVE_ROUTERS = getConfiguredRouters();

    appConfig
        .setupApp(app)
        .setupRouters(app, ACTIVE_ROUTERS);
}