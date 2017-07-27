"use strict";

const routes = [
    ...require('./base'),
    ...require('./oauth')
];

module.exports = routes;