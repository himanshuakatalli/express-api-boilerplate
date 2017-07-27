"use strict";

const _err = require('./../../app/helpers/v1/error');
const mailer = require('./mailer');

const services = {
    mailer
};

module.exports = {
    getConfiguration (service) {
        if (!services[service])
            throw _err.createError(_err.getError('SERVICE_CONFIG_UNDEFINED'));

        return services[service];
    }
};