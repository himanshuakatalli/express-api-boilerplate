"use strict";

const adminBearer = require('./strategies/bearer-admin');
const studentBearer = require('./strategies/bearer-student');
const mentorBearer = require('./strategies/bearer-mentor');
const counsellorBearer = require('./strategies/bearer-counsellor');
const mentorCounsellorBearer = require('./strategies/bearer-mentor-counsellor');
const clientBasic = require('./strategies/client-basic');

const basic = require('./strategies/basic');

module.exports = {
    basic,
	clientBasic,
	adminBearer,
	studentBearer,
	mentorBearer,
	counsellorBearer,
	mentorCounsellorBearer
};