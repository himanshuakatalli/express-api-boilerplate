"use strict";

const E = require('../helpers/v1/error');

class BaseMailer {
    constructor (config) {
        this.initialize(config);
    }

    initialize() {
        throw E.createError( E.getError('METHOD_NOT_OVERRIDDEN'), 'Initialize method needs to be overridden' );
    }

    sendMail () {
        throw E.createError( E.getError('METHOD_NOT_OVERRIDDEN'), 'Sendmail method needs to be overridden' );
    }
}

module.exports = BaseMailer;