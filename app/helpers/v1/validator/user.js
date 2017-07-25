"use strict";

const mongoose = require('mongoose');
const User = mongoose.model('User');

const E = require('../error');
const _hashHelper = require('../hash');

module.exports = {

	async isNewUser(username) {
		let user = await User.findOne({ 'email': username });

		if (user)
			throw E.createError(E.getError('DUPLICATE_RESOURCE'), 'User already registered');

		return !false;
	},

	isValidUser(user) {
		if (!user)
			throw E.createError(E.getError('USER_NOT_FOUND'), 'User not found');

		return true;
	},

	isValidOldPassword(oldPassword, user) {
		if (oldPassword != user.password)
			throw E.createError(E.getError('CREDENTIALS_INCORRECT'), 'Old password does not match');
		return true;
	},

	isValidUserPassword(user, password) {
		if (!password)
			throw E.createError(E.getError('CREDENTIALS_INCORRECT'), 'User password cannot be empty');

		if (!_hashHelper.verifyHashSync(password, user.password))
			throw E.createError(E.getError('CREDENTIALS_INCORRECT'), 'User password does not match');

		return true;
	},

	isValidRegisterRequest(reqData) {
		if (!reqData.username)
			throw E.createError(E.getError('BAD_REQUEST'), 'username is required');

		if (!reqData.password)
			throw E.createError(E.getError('BAD_REQUEST'), 'password is required');

		if (!reqData.roles)
			throw E.createError(E.getError('BAD_REQUEST'), 'roles are required');

		return true;
	},

	isValidResetFlowOneRequest(data) {
		if (!data.email)
			throw E.createError(E.getError('BAD_REQUEST'), 'email is required in request params');

		return true;
	},

	areValidResetFlowTwoParams(data) {
		if (data.length < 2)
			throw E.createError(E.getError('BAD_REQUEST'), 'Too few parameters supplied');
		return true;
	},

    isValidAccountVerificationRequest(data) {
	    if (data.length < 2)
	        throw E.createError( E.getError('BAD_REQUEST'), 'Too few parameters supplied' );
    },

	isValidVerificationHash(user, hash) {
		if (user.verification_hash !== hash)
			throw E.createError(E.getError('BAD_REQUEST'), 'Invalid verification hash');
		return true;
	},

    isAdmin (user) {
	    return user.roles.some(role => role.name === 'ADMIN');
    }
};