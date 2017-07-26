"use strict";

const passport = require('passport');
const E = require('./../../../helpers/v1/error');

module.exports = (role) => {
	return (req, res , next) => {
		switch (role) {

			case 'client':
				passport.authenticate('clientBasic', { session: false })(req, res, next);
				break;

            case 'basic':
                passport.authenticate('basic', { session: false })(req, res, next);
                break;

			default:
				throw new E.createError(E.getError('UNSUPPORTED_STRATEGY'));
		}
	}
};