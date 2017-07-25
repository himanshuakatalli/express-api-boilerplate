"use strict";

const base = require('../../../../unirely/app/http/controllers/root/base');

const API_ROUTES = [
	{ path: '', method: 'GET', handlers: [ base.index ] }
];

module.exports = API_ROUTES