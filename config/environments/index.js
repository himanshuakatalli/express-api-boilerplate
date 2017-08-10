"use strict";

const defaultEnv = require('./default');
const dev = Object.assign({}, defaultEnv, require('./development'));
const staging = Object.assign({}, defaultEnv, require('./staging'));
const prod = Object.assign({}, defaultEnv, require('./production'));

module.exports = {
    dev,
    staging,
    prod
}[process.env.NODE_ENV || 'dev'];