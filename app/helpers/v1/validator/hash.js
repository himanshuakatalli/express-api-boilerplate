"use strict";

const _hash = require('./../../../helpers/v1/hash');
const E = require('./../error');

module.exports = {
    hashNotExpired (hash) {
        let decodedHash = _hash.decodeBase64Secret(hash);
        let now = Math.floor(Date.now()/1000);
        if (now > decodedHash.expires)
            throw E.createError( E.getError('BAD_REQUEST'), 'Verification hash has expired');
        return true;
    }
};