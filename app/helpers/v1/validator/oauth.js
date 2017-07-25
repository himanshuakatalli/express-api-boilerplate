"use strict";

const mongoose = require('mongoose');
const OauthToken = mongoose.model('OauthToken');
const OauthClient = mongoose.model('OauthClient');
const User = mongoose.model('User');

const E = require('../error');

const _user = require('./user');
const _token = require('../token');

//noinspection JSAnnotator
const self = module.exports = {
	isValidOauthRequest (requestBody) {

		if (!requestBody.username)
			throw E.createError(E.getError('BAD_REQUEST'), "username field is missing");

		if (!requestBody.password)
			throw E.createError(E.getError('BAD_REQUEST'), "password field is missing");

		if (!requestBody.grant_type)
			throw E.createError(E.getError('BAD_REQUEST'), "Unsupported grant type");

		return true;
	},

	isValidOauthClient (client) {
		if (!client)
			throw E.createError(E.getError('USER_NOT_FOUND'), 'Client not found');

		return true;
	},

	isValidClientSecret (client, clientSecret) {
		if (!clientSecret)
			throw E.createError( E.getError('CREDENTIALS_INCORRECT'), 'Client Secret cannot be empty');

		if (client.client_secret !== clientSecret)
			throw E.createError( E.getError('CREDENTIALS_INCORRECT'), 'Client secret do not match');

		return true;
	},

	async isValidToken (token, type) {
		try {
			if (!token)
				throw new Error;

			if (type && token.type !== type)
				throw new Error;

			let client = await OauthClient.findById(token.client_id);
			let user = token.user_id ? await User.findById(token.user_id) : {};

			if (self.isValidOauthClient(client) && _user.isValidUser(user))
				return true;
		}

		catch(error) { throw E.createError(E.getError('INVALID_TOKEN'), "Token validation failed") }
	},

	isVerifiedToken (accessToken, verificationOptions) {
		return _token.verifyToken(accessToken, verificationOptions);
	},

	tokenHaveScope (scopes, checkForScopes) {
		if (typeof scopes === 'string')
			scopes = scopes.split(",");

		if (!checkForScopes.some(scope => scopes.indexOf(scope) !== -1))
			throw E.createError(E.getError('INVALID_TOKEN'), 'Not authorized');

		return true;
	}
};
