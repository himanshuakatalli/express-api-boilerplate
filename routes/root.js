"use strict";

const root = require('../app/controllers/v1/root');

module.exports = [
    {
        method: 'GET',
        path: '',
        handlers: [ root.index ]
    }
];