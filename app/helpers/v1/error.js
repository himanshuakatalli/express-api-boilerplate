"use strict";

const { CUSTOM_ERRORS } = require('../../constants/v1/errors');

exports.getError = (name) => CUSTOM_ERRORS[name] || CUSTOM_ERRORS['SERVER_ERROR'];

exports.createError = (error, message, status, code) => {
    let err = new Error;
    err.code = code || error.code;
    err.status = status || error.status;
    err.message = message || error.message;
    return err;
};