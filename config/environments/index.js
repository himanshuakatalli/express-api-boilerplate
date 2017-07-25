"use strict";

const development = new (require('./development'));
const production = new (require('./production'));
const staging = new (require('./staging'));

module.exports = {
    development,
    staging,
    production,
} [process.env.ENV || 'development'];