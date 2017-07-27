"use strict";

const mongoose = require('mongoose');
const OauthClient = mongoose.model('OauthClient');

const _validator = require('../../../../helpers/v1/validator/index');
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
    }
}