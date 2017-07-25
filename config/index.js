"use strict";

const activeAPIs = require('./api').getActiveAPIS();
require('./utils').preloadAPIFiles(activeAPIs);

const auth = require('./auth');
const db = require('./db');
const passport = require('passport');
const services = require('./services');
const expressApp = require('./express');
const envConfig = require('./environments');

const activeRouters = require('./../routers').getConfiguredRoutersFor(activeAPIs);

module.exports = function (app) {
    
    db.configure(envConfig);

	auth
		.initializeOauthServer(activeRouters)
		.configure({
			name: 'passport',
			driver: passport
		});

    expressApp
        .setupApp(app)
        .setupPassport(app, passport)
        .setupRouters(app, activeRouters)
};