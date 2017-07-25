"use strict";

const bcrypt = require('bcrypt');
const SECRET = process.env.SECRET || 'ghO/I-uYjYTM[>n7hQ;a|nJlasex1&`/*-ut[uQ-wR33G#Dk$X}Me&g3tg~0_*.7WIK~M'
const self = module.exports = {

	generateSecret: data => {
		if (Array.isArray(data))
			return self.generateHashFor(data.join('-') + SECRET);

		if (data && typeof data === 'object')
			return self.generateHashFor(JSON.stringify(data) + SECRET);
	},

	generateHashSyncFor: value => bcrypt.hashSync(value, 10),

	generateHashFor: value => bcrypt.hash(value, 10),

	verifyHash: (value, hash) => bcrypt.compare(value, hash),

	verifyHashSync: (value, hash) => bcrypt.compareSync(value, hash),

	generateBase64Secret: data => {
		if (Array.isArray(data))
			data = data.join('-');

		if (typeof data === 'object')
			data = JSON.stringify(data);

		return Buffer.from(data).toString('base64');
	},

	decodeBase64Secret: secret => Buffer.from(secret, 'base64').toString('ascii')
};