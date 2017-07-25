"use strict";

const mongoose = require('mongoose');

const OauthTokenSchema = require('./schemas/oauth-token');

module.exports = mongoose.model('OauthToken', OauthTokenSchema);