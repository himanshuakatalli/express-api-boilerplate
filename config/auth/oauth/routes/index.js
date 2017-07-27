"use strict";

const oauth = require('../../../../app/http/controllers/v1/oauth/user');
const isAuthenticated = require('../../../../app/http/middlewares/v1/isAuthenticated');

const setupOauthEndpoints = (routers, server) => {

	routers.forEach(router => {
		if (router.version !== 'root') {

		}
	});
}

module.exports = {
	setupOauthEndpoints
};