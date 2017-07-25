'use strict';

const mongoose = require('mongoose');
const UniversitySchema = require('./schemas/university');

module.exports = mongoose.model('University', UniversitySchema);