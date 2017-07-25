"use strict";

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Role = mongoose.model('Role');
const OauthClient = mongoose.model('OauthClient');

const response = require('../../middlewares/response');
const _validator = require('../../../helpers/v1/validator');
const _hash = require('../../../helpers/v1/hash');
const _oauth = require('../../../helpers/v1/oauth');

const __mailer = require('../../../services/v1/mailer');

const envConfig = require('../../../../config/environments');

const E = require('./../../../helpers/v1/error');

const userAuth = {

    async getClientCredentials(req, res) {
        try {
            let client = await OauthClient.findOne({user_id: req.user._id, client_id: req.body.clientId});
            if (_validator.oauth.isValidOauthClient(client))
                response.ok(res, {id: client.client_id, secret: client.client_secret});
        }
        catch (error) {
            response.error(res, error);
        }
    },

	async register (req, res, next) {
		try {
			if (
				_validator.oauth.isValidOauthRequest(req.body) &&
				await _validator.user.isNewUser(req.body.username) &&
				_validator.user.isValidRegisterRequest(req.body)
			) {

				let data = Object.assign({}, req.body);
				let roles = await Role.find({ name: { $in: req.body.roles.split(' ') } }).select('_id');

				data.roles = roles.map(role => role._id)
				data.email = req.body.username;

				if (_validator.role.areValidRoles(data.roles)) {

                    data.verification_hash = await _hash.generateBase64Secret({
                        email: data.email,
                        expires: Math.floor(Date.now()/1000) + 24*60*60
                    });

				    let user = await User.create(data);

                    _oauth.sendAccountVerificationEmail (
                        user.verification_hash,
                        user.email,
                        req.user.user_id.email
                    );

					next(null, user);
				}
			}
		}
		catch(err) {
		    console.log(err);
		    response.error(res, err.status ? err : E.getError(err.name));
		}
	},

	async resetPasswordFlowOne (req, res) {
		try {
			let email = req.params.emailId;

			if(_validator.user.isValidResetFlowOneRequest({ email })) {
				let user = await User.findOne({ email });

				if (_validator.user.isValidUser(user)) {
					let verificationHash = await _hash.generateBase64Secret({
						email: user.email,
						expires: Math.floor(Date.now()/1000) + 24*60*60
					});
					user.verification_hash = verificationHash;
					user = await user.save();

					let adminRole = await Role.findOne({ name: 'ADMIN' });

					if (_validator.role.areValidRoles(adminRole)) {

                        let admin = await User.findOne({ 'roles': { $in: [ adminRole._id ] } });

                        if (_validator.user.isValidUser(admin)) {
                            let verificationURL = process.env.APP_URL + '/password/reset/' + `${user.email}&${user.verification_hash}`;
                            const data = {
                                to: user.email,
                                from: admin.email,
                                subject: 'Password Reset',
                                html: '<h3>Password reset link</h3><div><a href=`${verificationURL}`>verificationURL</a></div>'
                            }

                            let result = await __mailer.sendMail(data);

                            response.ok(res, {
                                email: user.email,
                                verification_hash: user.verification_hash,
                                message: "A verification email has been sent to registered email."
                            });
                        }
                    }
				}
			}
		}
		catch (err) {
		    if (!err.status) {
		        err = E.createError(new Error, err.message, 'E_INTERNAL_SERVER_ERROR', 500);
            }
			response.error(res, err);
		}
	},

	async resetPasswordFlowTwo (req, res) {
		try {
			let params = req.params.emailHash.split('&');

			if (_validator.user.areValidResetFlowTwoParams(params)) {
			    let email = params[0], hash = params[1];
				let user = await User.findOne({ email });

				if (
				    _validator.user.isValidUser(user) &&
                    _validator.user.isValidVerificationHash(user, hash) &&
                    _validator.hash.hashNotExpired(hash)
                ) {
                    user.verification_hash = null;
                    await user.save();
                    response.ok(res, {
                        message: "Email and hash verified"
                    });
				}
			}
		}
		catch (err) {
			response.error(res, err);
		}
	},

	async resetPasswordFlowThree(req, res) {
	   try {
	       let email = req.body.email;
	       let password = req.body.password;
	       let user = await User.findOne({ email });

	       if (_validator.user.isValidUser(user)) {
	           user.password = password;
	           await user.save();

	           response.modified(res, {
	               message: "Password reset successfully"
               });
           }
       }
       catch(err) {
	       response.error(res, err);
	   }
    },

    async verifyUser(req, res) {

        try {
            let params = req.params.emailHash.split('&');


            if (_validator.user.isValidAccountVerificationRequest(params)) {

                let user = await User.findOne({email: params[0]});

                if (_validator.user.isValidUser(user)) {

                    user.verified = true;
                    await user.save();
                }
            }

            response.modified(res, {message: "User successfully verified"});
        }
        catch(err) {
            console.log(err);
            response.error(res, err);
        }
    }
};

module.exports = {
	user: userAuth
};