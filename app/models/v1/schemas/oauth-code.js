"use strict";

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OauthCodeSchema = new Schema(
	{
		'client_id': {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'OauthClient'
		},

		'user_id': {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},

		code: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true,
		autoIndex: true,
		versionKey: false
	}
);

module.exports = OauthCodeSchema;