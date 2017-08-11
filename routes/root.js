"use strict";

const root = require('../app/controllers/root');

module.exports = [
    {
        method: 'GET',
        path: '',
        handlers: [ root.index ]
    },
    {
        method: 'ALL',
        path: '*',
        handlers: [ root.error ]
    }
];