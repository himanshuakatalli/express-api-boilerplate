"use strict";

require('dotenv').config();
require('./db');

const ACTIVE_APIS = require('./express/api');
const appConfig = require('./express');

exports.init = function (app) {
    appConfig
        .preloadAPIFiles(ACTIVE_APIS)
        .setupApp(app)
        .setupRouters(ACTIVE_APIS, app);
}