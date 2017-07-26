"use strict";

const isAuthenticated = require('../../../../app/http/middlewares/v1/isAuthenticated');

const setupOauthEndpoints = (routers, server) => {

	routers.forEach(router => {
		if (router.version !== 'root') {
            router.router.post('/oauth/client', isAuthenticated('basic'), function (req, res) {
                res.end('ASD');
            });
		}
	});
}

module.exports = {
	setupOauthEndpoints
};