"use strict";

const fs = require('fs');
const env = require('../environments');
const ACTIVE_APIS = env.ACTIVE_APIS.split(',');
const _err = require('../../app/helpers/v1/error');

ACTIVE_APIS.forEach(version => {
    if( !fs.existsSync(`${env.ROOT_DIR}/routes/${version}`) )
        throw _err.createError('ROUTES_NOT_DEFINED', `Routes for api version ${version} not defined`);
});

module.exports = ACTIVE_APIS;