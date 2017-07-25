"use strict";

const base = require('./../../../app/http/controllers/v1/base');
const isAuthenticated = require('../../../app/http/middlewares/v1/isAuthenticated');

const routes = [
    { path: "", method: "GET", handlers: [ base.index ] },
    { path: "", method: "POST", handlers: [isAuthenticated('student'), base.index] },
    { path: "/oauth2/authorize", method: "GET", handlers: [base.index] },
    ...require('./student'),
    ...require('./counsellor'),
    ...require('./mentor')
];

module.exports = routes;