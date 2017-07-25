'use strict';

const mongoose = require('mongoose');
const QuickbloxSchema = require('./schemas/quickblox');

module.exports = mongoose.model('Quickblox', QuickbloxSchema);