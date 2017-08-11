"use strict";

const base = require ('../../app/controllers/v1/base');

module.exports = [
    { method: 'GET', path: '', handlers: [ base.index ] }
];