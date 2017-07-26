"use strict";

const base = require('./../../../app/http/controllers/v1/base');
const isAuthenticated = require('../../../app/http/middlewares/v1/isAuthenticated');

const routes = [
    { path: "", method: "GET", handlers: [ base.index ] }
];

module.exports = routes;