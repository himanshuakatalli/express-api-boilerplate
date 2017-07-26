"use strict";

const _err = require('./../error');

module.exports = {

    isValidOauthClient(client) {
        if (!client)
            throw _err.createError( _err.getError('RESOURCE_NOT_FOUND'), 'Client not found' );

        return true;
    }
}