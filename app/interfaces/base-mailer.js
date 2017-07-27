"use strict";

const _err = require('../helpers/v1/error');

class BaseMailer {
    constructor (config) {
        this.initialize(config);
    }

    initialize() {
        throw _err.createError( _err.getError('METHOD_NOT_OVERRIDDEN'), 'Initialize method needs to be overridden' );
    }

    sendMail () {
        throw _err.createError( _err.getError('METHOD_NOT_OVERRIDDEN'), 'Sendmail method needs to be overridden' );
    }
}

module.exports = BaseMailer;