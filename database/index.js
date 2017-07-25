"use strict"

const db = require('./../config/database');
const envConfig = require('./../config/environments');

db.configure(envConfig);