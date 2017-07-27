"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OauthClientSchema = new Schema(
	{
		'user': {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},

		'client_name': {
			type: String,
			default: null
		},

		'client_id': {
			type: String,
			required: true,
			unique: true
		},

		'client_secret': {
			type: String,
			required: true,
		},

		'redirect_uri': {
			type: String,
			default: ""
		}
	},
	{
		timestamps: true,
		autoIndex: true,
		versionKey: false
	}
);

module.exports = OauthClientSchema;