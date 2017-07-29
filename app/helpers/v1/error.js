"use strict";

const E_CONSTANTS = require('./../../constants/errors');

module.exports = {
	getError(errName) {
		return E_CONSTANTS.PREDEFINED_ERRORS[errName] || E_CONSTANTS.CUSTOM_ERRORS[errName] || E_CONSTANTS.CUSTOM_ERRORS.INTERNAL_SERVER_ERROR;
	},
	createError (e, message = null, code = null, status = null) {
		let error = new Error;
		error.code = code || e.code;
		error.message = message || e.message;
		error.status = status || e.status;



		return error;
	}
};