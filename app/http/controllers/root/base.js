"use strict";

const response = require('./../../middlewares/response');

module.exports = {

	index (req, res) {
		response.ok(res, { "status": "OK" });
	}
};