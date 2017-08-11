"use strict";

const response = require('../../middlewares/response');

exports.index = (req, res) => response.ok(res, { message: 'API v1 working' });