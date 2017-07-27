"use strict";

const dummyClientBasic = require('./strategies/dummy-client-basic');
const clientBasic = require('./strategies/client-basic');
const basic = require('./strategies/basic');

module.exports = {
    basic,
	clientBasic,
    dummyClientBasic
};