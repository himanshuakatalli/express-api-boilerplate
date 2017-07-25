"use strict";
const mongoose = require('mongoose');
const OauthToken = mongoose.model('OauthToken');
const OauthClient = mongoose.model('OauthClient');

const _validator = require('../../../../app/helpers/v1/validator');

const _validateBearerTokenFor = function (...scopes) {

	return async (accessToken, done) => {
		try {

			let token = await OauthToken.findOne({token: accessToken});

			if (await _validator.oauth.isValidToken(token, 'ACCESS')) {

				let issclient = OauthClient.findById(token.client_id);

				let verificationOptions = {
					audience: issclient.client_name
				};

				let decodedToken = _validator.oauth.isVerifiedToken(accessToken, verificationOptions);

				if (_validator.oauth.tokenHaveScope(decodedToken.scope, scopes))
					return done(null, token, decodedToken);
			}
		}
		catch (error) {
			done(null, false);
		}
	}
}

module.exports = _validateBearerTokenFor;
