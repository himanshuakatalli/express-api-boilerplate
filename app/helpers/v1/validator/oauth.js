"use strict";

const _err = require('./../error');

module.exports = {

    isValidOauthClient(client) {
        if (!client)
            throw _err.createError( _err.getError('UNAUTHORIZED'), 'Client not found' );

        return true;
    },

    isValidClientSecret (client, clientSecret) {
        if (!clientSecret)
            throw _err.createError( _err.getError('UNAUTHORIZED'), 'Client secret cannot be empty or null' );

        if (client.client_secret !== clientSecret)
            throw _err.createError( _err.getError('UNAUTHORIZED'), 'Client and secret do not form a recognised pair' );

        return true;
    },

    isValidOauthRequest ({ username, password, grant_type }) {
        if (!username || !password || !grant_type)
            throw _err.createError(
                _err.getError('BAD_REQUEST'),
                'Username or password or grant_type is missing from request body'
            );

        return true;
    }
};