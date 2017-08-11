"use strict";

const { logger } = require('../../../config/logger');
const { CUSTOM_ERRORS } = require('../../constants/v1/errors');

exports.getError = (name) => CUSTOM_ERRORS[name] || CUSTOM_ERRORS['SERVER_ERROR'];

exports.createError = (name, message, status, code) => {
    let error = exports.getError(name);
    let err = new Error;
    err.code = code || error.code;
    err.status = status || error.status;
    err.message = message || error.message;
    logger.error('Caught an error', err);
    return err;
};