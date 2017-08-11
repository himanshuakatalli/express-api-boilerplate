"use strict";

exports.CUSTOM_ERRORS = {
    SERVER_ERROR: {
        code: 'E_SERVER_ERROR',
        status: 500,
        message: 'Something bad happened'
    },

    ROUTES_NOT_DEFINED: {
        code: 'E_ROUTES_NOT_DEFINED',
        status: 500,
        message: 'Routes for the requested api version not defined'
    },

    SCHEMAS_UNDEFINED: {
        code: 'E_SCHEMAS_UNDEFINED',
        status: 500,
        message: 'Schemas are not defined or directory does not exist'
    },

    HANDLER_TYPE_NOT_SUPPORTED: {
        code: 'E_HANDLER_TYPE_NOT_SUPPORTED',
        status: 500,
        message: 'Handlers are required to be function'
    }
};