"use strict";

const mongoose = require('mongoose');
const Role  = mongoose.model('Role');
const User = mongoose.model('User');
const OauthClient = mongoose.model('OauthClient');

const _validator = require('../../../../helpers/v1/validator/index');
const _hash = require('../../../../helpers/v1/hash');
const response = require('../../../middlewares/response');

module.exports = {
    async getClientInfo (req, res) {
        try {
            const client = await OauthClient.findOne({user: req.user._id, client_id: 'imsapp'});
            if (_validator.oauth.isValidOauthClient(client)) {
                response.ok(res, {id: client.client_id, secret: client.client_secret});
            }
        }
        catch(err) {
            response.error(res, err);
        }
    },

    async register (req, res, next) {

        try {
            if (
                _validator.oauth.isValidOauthRequest(req.body) &&
                _validator.user.validRegisterRequest (req.body) &&
                _validator.user.isNewUser (req.body)
            ) {
                let data = Object.assign({}, req.body);
                let roles = await Role.find({ name: { $in: data.roles.split(' ') } });

                if (_validator.user.areValidRoles(roles)) {

                    data.roles = roles.map(role => role._id);
                    data.email = data.username;
                    data.verification_hash = _hash.generateBase64Secret ({
                        email: data.email,
                        iat: Date.now(),
                        expiresIn: process.env.HASH_EXPIRATION || 24*60*60
                    });

                    const user = await User.create(data);
                    next(null, user);
                }
            }
        }

        catch (err) {
            response.error(res, err);
        }
    }
}