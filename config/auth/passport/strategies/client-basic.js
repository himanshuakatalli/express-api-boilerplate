"use strict";

const mongoose = require('mongoose');
const OauthClient = mongoose.model('OauthClient');

const _validator = require('../../../../app/helpers/v1/validator');

const { BasicStrategy } = require('passport-http');

const _validateClient = async (clientId, clientSecret, done) => {
	try {

		let client = await OauthClient.findOne({ 'client_id': clientId }).populate('user');

		if (_validator.oauth.isValidOauthClient(client) && _validator.oauth.isValidClientSecret(client, clientSecret))
			done(null, client);
	}

	catch(error) { done(null, false); }
};

module.exports = {
	strategy: new BasicStrategy(_validateClient)
};