"use strict";

const oauth = require('../../../../app/http/controllers/v1/oauth');
const isAuthenticated = require('../../../../app/http/middlewares/v1/isAuthenticated');

const setupOauthEndpoints = (routers, server) => {

	routers.forEach(router => {
		if (router.version !== 'root') {

		    router.router.post(
                '/oauth/login',
                isAuthenticated('client'),
                server.token(),
                server.errorHandler()
            );

		    router.router.post (
		        '/oauth/register',
                isAuthenticated('client'),
                oauth.user.register,
                server.token(),
                server.errorHandler()
            )
		}
	});
}

module.exports = {
	setupOauthEndpoints
};