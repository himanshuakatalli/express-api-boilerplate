"use strict";

const oauth = require('./../../../../app/http/controllers/v1/oauth');
const isAuthenticated = require('../../../../app/http/middlewares/v1/isAuthenticated');

const setupOauthEndpoints = (routers, server) => {
	let _tokenMiddleWares = [];

	const _clientMiddlewares = [
        isAuthenticated('basic'),
        oauth.user.getClientCredentials
    ];

	const _registerMiddleWares = [
		isAuthenticated('client'),
		oauth.user.register,
		server.token(),
		server.errorHandler()
	];

	const _loginMiddleWares = _tokenMiddleWares = [
		isAuthenticated('client'),
		server.token(),
		server.errorHandler()
	];

	const _passwordResetFirstFlow = [
		isAuthenticated('client'),
		oauth.user.resetPasswordFlowOne
	];

	const _passwordResetSecondFlow = [
		isAuthenticated('client'),
		oauth.user.resetPasswordFlowTwo
	];

	const _passwordResetThirdFlow = [
        isAuthenticated('client'),
        oauth.user.resetPasswordFlowThree
    ];

	const _verificationMiddlewares = [
	    isAuthenticated('client'),
        oauth.user.verifyUser
    ];

	routers.forEach(router => {
		if (router.version !== 'root') {
		    router.router.post('/oauth/client', _clientMiddlewares);

			router.router.post('/oauth/register', _registerMiddleWares);
			router.router.post('/oauth/login', _loginMiddleWares);
            router.router.post('/oauth/token', _tokenMiddleWares);
            router.router.get('/oauth/verify/:emailHash', _verificationMiddlewares);

			router.router.get('/oauth/reset/password/email=:emailId', _passwordResetFirstFlow);
			router.router.get('/oauth/reset/password/:emailHash', _passwordResetSecondFlow);
            router.router.put('/oauth/reset/password', _passwordResetThirdFlow);
		}
	});
}

module.exports = {
	setupOauthEndpoints
};