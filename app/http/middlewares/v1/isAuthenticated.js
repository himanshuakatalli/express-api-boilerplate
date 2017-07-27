"use strict";

const passport = require('passport');
const _err = require('./../../../helpers/v1/error');

module.exports = (role) => {
	return (req, res , next) => {
		switch (role) {

            case 'basic':
                passport.authenticate('basic', { session: false })(req, res, next);
                break;

			case 'client':
				passport.authenticate('clientBasic', { session: false })(req, res, next);
				break;

			default:
				throw new _err.createError(_err.getError('UNSUPPORTED_STRATEGY'));
		}
	}
};