"use strict";

const mongoose = require('mongoose');

const OauthCodeSchema = require('./schemas/oauth-code');

module.exports = mongoose.model('OauthCode', OauthCodeSchema);