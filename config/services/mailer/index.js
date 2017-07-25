"use strict";
const mailgun = require('./mailgun');

const config = {
    mailgun
};

module.exports = function (mailerName) {
    return config[mailerName];
};