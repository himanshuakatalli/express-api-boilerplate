"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const _token = require('./../../../helpers/v1/token');

const OauthTokenSchema = new Schema(
	{
		'client_id': {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'OauthClient',
			default: null
		},

		'user_id': {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			default: null
		},

		'token': {
			type: String,
			unique: true,
			required: true
		},

		'scope': {
			type: String,
			default: null
		},

		'type': {
			type: String,
			enum: ['ACCESS', 'REFRESH'],
			required: true
		},

		'expires_in': {
			type: Number,
			required: true
		},

		'revoked': {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true,
		autoIndex: true,
		versionKey: false
	}
);

OauthTokenSchema.statics.saveTokens = (user, client, tokens, scope, self) => {
	let tokenData = [];

	for (let tokenType in tokens)
		tokenData.push({
			'client_id': client._id,
			'user_id': user ? user._id : null,
			'token': tokens[tokenType].token,
			'scope': tokenType === 'ACCESS' ? scope : null,
			'type': tokenType,
			'expires_in': tokens.ACCESS.expiresIn
		});

	return self.insertMany(tokenData);
}

module.exports = OauthTokenSchema;