"use strict";

const base = require('../../../app/http/controllers/v1/base');

const routes = [
    { path: "", method: "GET", handlers: [ base.index ] }
];

module.exports = routes;