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
    }
};