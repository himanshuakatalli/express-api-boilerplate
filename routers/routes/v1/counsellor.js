'use strict';

const counsellor = require('../../../app/http/controllers/v1/counsellor');
const isAuthenticated = require('../../../app/http/middlewares/v1/isAuthenticated');

module.exports = [
    { path: '/counsellor/:email/profile', method: 'PUT', handlers: [isAuthenticated('counsellor'),counsellor.updateDetails] },
    { path: '/counsellor/:email/password', method: 'PUT', handlers: [isAuthenticated('counsellor'),counsellor.changePassword] },
    { path: '/counsellor/:email/reset-password', method: 'PUT', handlers: [isAuthenticated('counsellor'),counsellor.resetPassword] }
]