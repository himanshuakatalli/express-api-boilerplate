'use strict';

const mentor = require('../../../app/http/controllers/v1/mentor');
const isAuthenticated = require('../../../app/http/middlewares/v1/isAuthenticated');

module.exports = [
    { path: '/mentor/:email/profile', method: 'PUT', handlers: [isAuthenticated('mentor'),mentor.updateDetails] },
    { path: '/mentor/:email/password', method: 'PUT', handlers: [isAuthenticated('mentor'),mentor.changePassword] },
    { path: '/mentor/:email/reset-password', method: 'PUT', handlers: [isAuthenticated('mentor'),mentor.resetPassword] }
]