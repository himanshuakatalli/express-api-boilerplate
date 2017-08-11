"use strict";

const response = require('../middlewares/response');

exports.index = (req, res) => response.ok(res, { message: 'IMS API' });