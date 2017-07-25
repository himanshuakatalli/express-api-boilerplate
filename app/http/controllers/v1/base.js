"use strict";

const mongoose = require('mongoose');
const User = mongoose.model('User');
const OauthClient = mongoose.model('OauthClient');

const _hash = require('./../../../helpers/v1/hash');
const response = require('../../middlewares/response');
const __mailer = require('../../../services/v1/mailer');

module.exports = {

	async index (req, res) {
        try {
            let data = {
                to: "himanshu.singh@venturepact.com",
                from: 'Admin< lol@mailgun.org >',
                subject: 'Gabbar',
                text: 'Hey how are you'
            };

            __mailer.sendMail(data)
                .then(res => console.log(res));

            response.ok(res, {"message": "API v1 working", "auth-info": req.authInfo});
        }
        catch(err) {
            response.error(res, err);
        }
    },

    async create (req, res, next) {
		console.log('Authinfo', req.authInfo);
		let user = await User.findOne({'email' : 'admin@unirely.co'});
		let b = _hash.verifyHashSync('secret', user.password);
		// console.log('B',b);
		response.ok(res, b);
    }
};
