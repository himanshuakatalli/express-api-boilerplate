"use strict";

const _hash = require('./../hash');
const _err = require('./../error');

module.exports = {

    isValidUser (user) {
        if (!user)
            throw _err.createError( _err.getError('RESOURCE_NOT_FOUND'), 'User does not exists' );

        return true;
    },

    isValidUserPassword(password, userPassword) {
        if (!_hash.verifyHashSync(password, userPassword))
            throw _err.createError( _err.getError('INCORRECT_CREDENTIALS'), 'User password did not match' );

        return true;
    },

    isAdmin (user) {
        if (!user.roles.some(role => role.name === 'ADMIN'))
            throw _err.createError( _err.getError('UNAUTHORISED'), 'User does not have enough rights to access resource' );

        return true;
    }
};