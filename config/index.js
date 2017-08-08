"use strict";

require('dotenv').config();
const env = require('./environments');

exports.init = function (app) {
    console.log(env);
}