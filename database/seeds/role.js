"use strict";

const mongoose = require('mongoose');
const Role = mongoose.model('Role');

const ROLES = [
	'ADMIN', 'ORGANISATION_LEAD', 'INSTITUTE_LEAD'
];

module.exports = {
	async run () {
		let roles = await Role.find({ name: { $in: ROLES }})

		if (roles.length)
			return;

		return Role.insertMany(
			ROLES.map(role => Object.assign({}, {
				name: role
			}))
		);
	}
};