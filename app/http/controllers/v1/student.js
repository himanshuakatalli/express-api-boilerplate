'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('User');
const response = require('../../middlewares/response');
const _user = require('../../../helpers/v1/user');
const _validator = require('../../../helpers/v1/validator');

module.exports = {
    async updateDetails(req, res) {
        try {
            let user = await _user.updateDetails(null, req.params.email, req.body);
            if (_validator.user.isValidUser(user))
                response.modified(res, user);
        }
        catch (err) {
            response.error(res, err);
        }
    },

    async changePassword(req, res) {
        try {
            let user = await _user.changePassword(null, req.params.email, req.body);
            response.modified(res, user);
        }
        catch (err) {
            console.log('Erroorrrrrr=========?????', err);
            response.error(res, err);
        }
    },

    async resetPassword(req, res) {
        try {
            let user = await _user.forgetPassword(null, req.params.email, req.body)
            response.modified(res, user);
        }
        catch (err) {
            console.log('Error====>', err);
            response.error(res, err);
        }
    }
};