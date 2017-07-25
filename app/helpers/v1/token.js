"use strict";

const extend = require('util')._extend;
const jwt = require('jsonwebtoken');
const { JWT_CONFIG, EXPIRES_IN, JWT_VALID_META, JWT_VERIFICATION_OPT } = require('../../../config/auth/jwt');

const E = require('./../../helpers/v1/error');

const self = module.exports = {

	generateTokens (data, scope, tokenMetas = null, accessOnly = false) {

		if (tokenMetas)
			self.areVerifiedTokenMetas(tokenMetas);

		if (accessOnly) return {
			'ACCESS': {
				token: self.generateToken('ACCESS', data, scope, tokenMetas),
				expiresIn: EXPIRES_IN.access
			}
		};

		return {
			'ACCESS': {
				token: self.generateToken('ACCESS', data, scope, tokenMetas),
				expiresIn: EXPIRES_IN.access
			},

			'REFRESH': {
				token: self.generateToken('REFRESH', data, null, tokenMetas),
				expiresIn: EXPIRES_IN.refresh
			}
		};
	},

	generateToken(tokenType, tokenData, scope, tokenMetas) {

		let data = Object.assign({}, tokenData);

		data['token_type'] = tokenType;

		if (scope)
			data['scope'] = scope.join(',');

		let JWT_OPTIONS = self.getJWTOptions(tokenType, tokenMetas);

		return jwt.sign(data, JWT_CONFIG.secret, JWT_OPTIONS);
	},

	verifyToken(token, checkFor = null) {

		let verificationOptions = JWT_VERIFICATION_OPT;

		if (checkFor)
			extend(verificationOptions, checkFor);

		return jwt.verify(token, JWT_CONFIG.secret, verificationOptions);
	},

	areVerifiedTokenMetas (tokenMetas) {
		for (let metaKey in tokenMetas)
			if (JWT_VALID_META.indexOf(metaKey) < 0)
				throw E.createError(E.getError('INVALID_JWT_OPTION'), `${metaKey} is not a valid JWT option`);

		return true;
	},

	getJWTOptions (tokenType, tokenMetas) {
		let JWT_DEFAULTS = {
			expiresIn: EXPIRES_IN[ tokenType.toLowerCase() ] || EXPIRES_IN.default,
			algorithm: JWT_CONFIG.algorithm,
			issuer: JWT_CONFIG.issuer,
			audience: JWT_CONFIG.audience
		};

		if (tokenMetas)
			for (let metaKey in tokenMetas)
				JWT_DEFAULTS[metaKey] = tokenMetas[metaKey];

		return JWT_DEFAULTS;
	}
};