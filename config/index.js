"use strict";

require('dotenv').config();
const { expressLogger } = require('./logger');

exports.init = function (app) {

    app.use(expressLogger);

    app.get('/', function (req, res, next) {
        // throw new Error;
        res.send('aSD');
    });
}