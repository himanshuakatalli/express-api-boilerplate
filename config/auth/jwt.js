"use strict";

const day = 24*60*60;

const JWT_VALID_META = [
	'algorithm', 'expiresIn', 'notBefore', 'audience', 'issuer', 'jwtid', 'subject', 'noTimestamp', 'header', ''
]

const EXPIRES_IN = {
	'default': day,
	'access': process.env.ACCESS_EXPIRATION || day,
	'refresh': process.env.REFRESH_EXPIRATION || 2 * 365 * day
};

const JWT_CONFIG = {
	'algorithm': 'HS256',
	'secret': process.env.SECRET,
	'issuer': 'api.ims.com',
	'audience': 'IMS Web App'
};

const JWT_VERIFICATION_OPT = {
	'algorithm': JWT_CONFIG.algorithm,
	'issuer': JWT_CONFIG.issuer
}

module.exports = {
	EXPIRES_IN,
	JWT_CONFIG,
	JWT_VALID_META,
	JWT_VERIFICATION_OPT
};