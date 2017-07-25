"use strict";

const E = require('./../../app/helpers/v1/error');
const mailer = require('./mailer');

const services = {
    mailer
};

module.exports = {
    getConfiguration (service) {
        if (!services[service])
            throw E.createError(E.getError('SERVICE_CONFIG_UNDEFINED'));

        return services[service];
    }
};