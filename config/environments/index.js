"use strict";

const defaultEnv = require('./default');
const development = Object.assign({}, defaultEnv, require('./development'));

module.exports = {
    development
}[process.env.NODE_ENV || 'development'];