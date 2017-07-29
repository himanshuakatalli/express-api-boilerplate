"use strict";

const oauth = require('../../../app/http/controllers/v1/oauth');
const isAuthenticated = require('./../../../app/http/middlewares/v1/isAuthenticated');

module.exports = [
    {
        method: 'GET',
        path: '/oauth/db/reset',
        handlers: [ isAuthenticated('dummyClient'), oauth.db.reset ]
    },

    {
        method: 'GET',
        path: '/oauth/db/seed/basic',
        handlers: [ isAuthenticated('dummyClient'), oauth.db.seed ]
    },

    {
        method: 'POST',
        path: '/oauth/client',
        handlers: [ isAuthenticated('basic'), oauth.user.getClientInfo ]
    },
];