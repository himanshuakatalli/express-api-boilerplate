"use strict";

const oauth2orize = require('oauth2orize');
const _ = require('lodash');

const mongoose = require('mongoose');
const User = mongoose.model('User');
const OauthToken = mongoose.model('OauthToken');

const _token = require('./../../../../app/helpers/v1/token');
const _validator = require('../../../../app/helpers/v1/validator');

const _postClientValidate = async (client, username, password, scope, done) => {
    try {
        let user  = User.findOne({ email: username }).populate('roles');
        if (
            _validator.user.isValidUser(user) &&
            _validator.user.isValidUserPassword(password, user.password)
        ) {
            scope = scope || user.roles.map(role => role.name).join(' ');
            const tokenData = {

            };
            // let token = _token.generateTokens()
        }
    }

    catch (err) {
        console.log(err);
        done(err);
    }
};

module.exports = oauth2orize.exchange.password(_postClientValidate);