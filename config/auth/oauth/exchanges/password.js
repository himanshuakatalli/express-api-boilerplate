"use strict";

const oauth2orize = require('oauth2orize');
const _ = require('lodash');

const mongoose = require('mongoose');
const User = mongoose.model('User');
const OauthToken = mongoose.model('OauthToken');

const _token = require('./../../../../app/helpers/v1/token');
const _validator = require('../../../../app/helpers/v1/validator');

const _postClientValidate = async (client, username, password, scope, done) => {

	try {
		let user = await User.findOne({ 'email' : username }).populate('roles').lean();

		if (!scope)
			scope = user.roles.map(role => role.name.toLowerCase());

		if (_validator.user.isValidUser(user) && _validator.user.isValidUserPassword(user, password)) {

			let data = {
				email: user.email,
				client: client.client_name,
				time: Date.now()
			};

			let tokenMetas = { audience: client.client_name };

			let tokens = _token.generateTokens(data, scope, tokenMetas, true);

			await OauthToken.saveTokens(user, client, tokens, scope, OauthToken);

			let resUser = _.omit(user, ['password', 'verified', 'verification_hash', 'universities', 'createdAt', 'updatedAt']);

			return done (
				null,
				tokens.ACCESS.token,
				null,
				{ 'expires_in': tokens.ACCESS.expiresIn, 'scope': scope.join(' '), user: resUser }
			);
		}
	}

	catch(error) { done(error); }
};

module.exports = oauth2orize.exchange.password(_postClientValidate);