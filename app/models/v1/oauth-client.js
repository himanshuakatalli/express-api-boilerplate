"use strict";

const mongoose = require('mongoose');

const OauthClientSchema = require('./schemas/oauth-client');

module.exports = mongoose.model('OauthClient', OauthClientSchema);