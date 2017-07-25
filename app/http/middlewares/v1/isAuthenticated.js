"use strict";

const passport = require('passport');
const E = require('./../../../helpers/v1/error');

module.exports = (role) => {
	return (req, res , next) => {
		switch (role) {

			case 'admin':
				passport.authenticate('adminBearer', { session: false })(req, res, next);
				break;

			case 'mentor':
				passport.authenticate('mentorBearer', { session: false })(req, res, next);
				break;

			case 'student':
				passport.authenticate('studentBearer', { session: false })(req, res, next);
				break;

			case 'counsellor':
				passport.authenticate('counsellorBearer', { session: false })(req, res, next);
				break;

			case 'mentor-or-counsellor':
				passport.authenticate('mentorCounsellorBearer', { session: false })(req, res, next);
				break;

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