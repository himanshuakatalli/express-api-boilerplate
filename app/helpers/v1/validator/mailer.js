"use strict";

const E = require('./../error');

module.exports = {
    isValidEmailData (data) {
        const reqKeys = ['to', 'from', 'subject'];
        const optKeys = ['html', 'text'];
        const dataKeys = Object.keys(data);

        if(
            !reqKeys.every(key => dataKeys.indexOf(key) !== -1) ||
            !optKeys.some(key => dataKeys.indexOf(key) !== -1)
        )
            throw E.createError( E.getError('EMAIL_DATA_INVALID') );

        return true;
    }
}