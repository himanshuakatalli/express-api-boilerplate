"use strict";

const oauth2orize = require('oauth2orize');
const _ = require('lodash');

const mongoose = require('mongoose');
const User = mongoose.model('User');
const OauthToken = mongoose.model('OauthToken');

const _token = require('./../../../../app/helpers/v1/token');
const _validator = require('../../../../app/helpers/v1/validator');

const _postClientValidate = async (client, username, password, scope, done) => {

};

module.exports = oauth2orize.exchange.password(_postClientValidate);