"use strict";
const response = require('../../middlewares/response');

module.exports = {

	index (req, res) {
        response.ok(res, {"message": "API v1 working"});
    }
};
