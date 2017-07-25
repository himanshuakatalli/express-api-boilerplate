"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema (
	{
		'name': {
			type: String,
			required: true
		},

		'parent': {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Role',
			default: null
		}
	},
	{
		timestamps: true,
		autoIndex: true,
		versionKey: false
	}
);


module.exports = RoleSchema;