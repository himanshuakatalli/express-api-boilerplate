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
        let user  = await User.findOne({ email: username }).populate('roles').lean();

        if (
            _validator.user.isValidUser(user) &&
            _validator.user.isValidUserPassword(password, user.password)
        ) {
            scope = scope || user.roles.map(role => role.name.toLowerCase());
            const tokenData = {
                id: user._id,
                email: user.email,
                client: client.client_name,
                time: Date.now()
            };
            const tokenMetas = { audience: client.client_name };

            let tokens = _token.generateTokens (tokenData, scope, tokenMetas, true);

            await OauthToken.saveTokens(client, user, tokens, scope, OauthToken);

            return done(
                null,
                tokens.ACCESS.token,
                null,
                { 'expires_in': tokens.ACCESS.expiresIn, 'scope': scope.join(' ') }
            );
        }
    }

    catch (err) {
        done(err);
    }
};

module.exports = oauth2orize.exchange.password(_postClientValidate);