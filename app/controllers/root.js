"use strict";

const _err = require('../helpers/v1/error');
const response = require('../middlewares/response');

exports.index = (req, res) => response.ok(res, { message: 'IMS API' });

exports.error = (req, res) => response.error(res, _err.createError('RESOURCE_NOT_FOUND'));