"use strict";

const envConfig = require('./../../../environments');

const _validator = require('../../../../app/helpers/v1/validator');

const { BasicStrategy } = require('passport-http');

const _validateClient = async (clientId, clientSecret, done) => {
    try {

        if (clientId === envConfig.auth.key && clientSecret === envConfig.auth.pass)
            done(null, { auth: envConfig.auth });
    }

    catch(error) { done(null, false); }
};

module.exports = {
    strategy: new BasicStrategy(_validateClient)
};