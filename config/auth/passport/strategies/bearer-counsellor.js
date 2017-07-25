"use strict";

const {Strategy: BearerStrategy} = require('passport-http-bearer');
const _validateBearerTokenFor = require('./bearer');

module.exports = {
	strategy: new BearerStrategy(_validateBearerTokenFor('counsellor'))
};