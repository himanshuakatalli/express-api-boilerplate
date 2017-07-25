"use strict";

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Role = mongoose.model('Role');

module.exports = {
	async run () {
		let adminUser = await User.findOne({ email: 'management@unirely.com' });

		if (adminUser)
			return;

		let adminRole = await Role.findOne({ name: 'ADMIN' });

		return User.create({
			fullname: 'Admin',
			email: 'management@unirely.com',
			password: 'secret',
			roles: [adminRole._id]
		});
	}
};