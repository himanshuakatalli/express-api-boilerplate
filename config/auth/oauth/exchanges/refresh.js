"use strict";

const extend = require('util')._extend;
const oauth2orize = require('oauth2orize');

const mongoose = require('mongoose');
const OauthToken = mongoose.model('OauthToken');
const User = mongoose.model('User');

const _validator = require('../../../../app/helpers/v1/validator');
const _token = require('./../../../../app/helpers/v1/token');

const _postClientValidate = async (client, refreshToken, scope, done) => {

	try {

		let data = {
			client: client.client_name,
			time: Date.now()
		}, user = null;

		let token = await OauthToken.findOne({token: refreshToken});

		if (await _validator.oauth.isValidToken(token, 'REFRESH')) {

			if (token.user_id) {
				user = await User.findById(token.user_id).populate('roles');
				data = extend(data, {
					email: user ? user.email : "",
					username: user ? user.username : ""
				});

				if (!scope)
					scope = user.roles.map(role => role.name.toLowerCase());
			}

			let tokenMetas = { audience: client.client_name };
			let tokens = _token.generateTokens(data, scope, tokenMetas, true);

			await OauthToken.saveTokens(user, client, tokens, scope, OauthToken);

			return done(
				null,
				tokens.ACCESS.token,
				null,
				{ 'expires_in': tokens.ACCESS.expiresIn, scope: scope.join(',') }
			);
		}
	}

	catch (error) { done(error); }
};

module.exports = oauth2orize.exchange.refreshToken(_postClientValidate);