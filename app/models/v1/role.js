"use strict";

const mongoose = require('mongoose');
const RoleSchema = require('./schemas/role');

module.exports = mongoose.model('Role', RoleSchema);