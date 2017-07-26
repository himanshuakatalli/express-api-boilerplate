"use strict";

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Role = mongoose.model('Role');

module.exports = {
	async run () {
		let adminUser = await User.findOne({ email: 'admin@ims.com' });

		if (adminUser)
			return;

		let adminRole = await Role.findOne({ name: 'ADMIN' });

		return User.create({
			fullname: 'Admin',
			email: 'admin@ims.com',
			password: 'secret',
			roles: [adminRole._id]
		});
	}
};