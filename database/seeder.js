"use strict"

require('dotenv').config();
const parseArgs = require('minimist');
const mongoose = require('mongoose');

const db = require('../config/db');
const envConfig = require('./../config/environments');

console.log(envConfig);

db.configure(envConfig);

const extraSeeders = parseArgs(process.argv.splice(2));

const _seedRunner = function () {
    console.log('Seed runner', extraSeeders);
};

mongoose.connection.on('connected', _seedRunner);