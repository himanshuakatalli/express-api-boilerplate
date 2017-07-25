"use strict";

const mongoose = require('mongoose');
const OauthClient = mongoose.model('OauthClient');
const User = mongoose.model('User');
const Role = mongoose.model('Role');
const _hashHelper = require('./../../../app/helpers/v1/hash');

module.exports = {
	async run () {
		let admin = await User.findOne({ email: 'management@unirely.com' });
		if (!admin) {
		    let adminRole = await Role.findOne({ name: 'ADMIN' });

		    if (!adminRole) {
		        return;
            }

            admin = await User.findOne({ roles: { $in: [adminRole._id] } });
        }

        let unirelyClient = await OauthClient.findOne({ 'user_id': admin._id });

        if (unirelyClient || !admin) return;

        let secret  = await _hashHelper.generateSecret([ admin._id, 'Unirely Web App' ]);

        return OauthClient.create({
            user_id: admin._id,
            client_id: 'unirelyapp',
            client_name: 'Unirely Web App',
            client_secret: secret,
            redirect_uri: ""
        });
	}
};
