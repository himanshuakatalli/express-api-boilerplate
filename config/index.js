"use strict";

require('dotenv').config();
require('./db');

const appConfig = require('./express');

exports.init = function (app) {
    appConfig.setupApp(app);
}