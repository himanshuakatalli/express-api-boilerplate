"use strict";

const mongoose = require('mongoose');
const OauthClient = mongoose.model('OauthClient');
const User = mongoose.model('User');
const Role = mongoose.model('Role');

const _hash = require('../../app/helpers/v1/hash');

module.exports = {
	async run () {
		let admin = await User.findOne({ email: 'admin@ims.com' });
		if (!admin) {
		    let adminRole = await Role.findOne({ name: 'ADMIN' });

		    if (!adminRole) {
		        return;
            }

            admin = await User.findOne({ roles: { $in: [adminRole._id] } });
        }

        const imsApp = await OauthClient.findOne({ 'user_id': admin._id });

        if (imsApp || !admin) return;

        const secret  = await _hash.generateBcryptSecret([ admin._id, 'Unirely Web App' ]);

        return OauthClient.create({
            user_id: admin._id,
            client_id: 'imsapp',
            client_name: 'IMS Web App',
            client_secret: secret,
            redirect_uri: ""
        });
	}
};
