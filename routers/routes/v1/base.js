"use strict";

const base = require('./../../../app/http/controllers/v1/base');
const isAuthenticated = require('../../../app/http/middlewares/v1/isAuthenticated');

module.exports = [
    { method: "GET", path: "", handlers: [ base.index ] }
];