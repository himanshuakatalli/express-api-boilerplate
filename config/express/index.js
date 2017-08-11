"use strict";

const { expressLogger } = require('../logger');
const bodyParser = require('body-parser');
const preload = require('./preload');
const routeConfigurator = require('./route-configurator');

exports.preloadAPIFiles = function (versions) {
    versions.forEach(version => preload(version));
    return exports;
};

exports.setupApp = function (app) {
    app.use(expressLogger);
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    return exports;
};

exports.setupRouters = function (ACTIVE_APIS, app) {
    const API_ROUTERS = [];

    ACTIVE_APIS.forEach(version => {
        API_ROUTERS.push({
            version,
            mountpoint: `/api/${version}`,
            router: routeConfigurator.getRouter(version)
        });
    });
    API_ROUTERS.forEach(router => app.use(router.mountpoint, router.router));
    app.use('', routeConfigurator.getRouter()); // Sets up 404 and base route handling routes
    return exports;
};

