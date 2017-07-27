"use strict";

const oauth = require('../../../app/http/controllers/v1/oauth');
const isAuthenticated = require('./../../../app/http/middlewares/v1/isAuthenticated');

module.exports = [
    {
        method: 'POST',
        path: '/oauth/client',
        handlers: [ isAuthenticated('basic'), oauth.user.getClientInfo ]
    },

    {
        method: 'GET',
        path: '/oauth/db/reset',
        handlers: [ isAuthenticated('client'), oauth.db.reset ]
    }
];