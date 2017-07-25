"use strict";

const extend = require('util')._extend;
const oauth2orize = require('oauth2orize');

const mongoose = require('mongoose');
const OauthToken = mongoose.model('OauthToken');
const User = mongoose.model('User');

const _validator = require('../../../../app/helpers/v1/validator');
const _token = require('./../../../../app/helpers/v1/token');

const _postClientValidate = async (client, refreshToken, scope, done) => {

};

module.exports = oauth2orize.exchange.refreshToken(_postClientValidate);