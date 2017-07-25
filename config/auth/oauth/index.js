"use strict";

const oauth2orize = require('oauth2orize');
const server = oauth2orize.createServer();

const exchanges = require('./exchanges');
const grants = require('./grants');
const oauthRoutes = require('./routes');

const self = module.exports = {

	setupGrants() {
		for(let grantName in grants)
			server.grant(grants[grantName]);
		return self;
	},

	setupExchanges() {
		for(let exchangeName in exchanges)
			server.exchange(exchanges[exchangeName]);
		return self;
	},

	setupAuthRoutes (routers) {
		oauthRoutes.setupOauthEndpoints(routers, server);
	}
};