"use strict";

const { expressLogger } = require('../logger');
const bodyParser = require('body-parser');

const preload = require('./preload');
const ACTIVE_APIS = require('./api');

exports.preloadAPIFiles = function () {
    ACTIVE_APIS.forEach(version => preload(version));
    return exports;
};

exports.setupApp = function (app) {
    app.use(expressLogger);
    app.disable('x-powered-by');
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    return exports;
};

exports.setupRouters = function (app, routers) {
    routers.forEach(router => app.use(router.mountPoint, router.router));
    return exports;
};

