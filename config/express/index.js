"use strict";

const { expressLogger } = require('../logger');
const bodyParser = require('body-parser');

exports.setupApp = function (app) {
    app.use(expressLogger);
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    return exports;
};