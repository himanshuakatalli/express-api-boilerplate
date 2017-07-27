"use strict";

const base = require('../../app/http/controllers/root');

const API_ROUTES = [
	{ path: '', method: 'GET', handlers: [ base.index ] }
];

module.exports = API_ROUTES;