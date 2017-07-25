"use strict";

const mongoose = require('mongoose');
const defaultUniversity = require('../seed-data/university');
const University =  mongoose.model('University');

module.exports = {
	async run () {
		try {
			await University.insertMany(defaultUniversity);
		}
		catch (err) {
			return;
		}
	}
};