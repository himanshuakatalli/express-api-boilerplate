"use strict";

const _err = require('../../app/helpers/v1/error');

// Don't touch basic seeders
const basicSeeders = [
	'role', 'user', 'oauth-client'
];

// Add your default necessary seeds here
const commonSeeders = [];

// Map all your seeds here
const seeders = {
	'role': require('./role'),
	'user': require('./user'),
	'oauth-client': require('./oauth-client')
};

const seederNotExists = (seederName) => !seeders[seederName];

module.exports = {

	async run (extras, basicOnly = false) {

	    if (basicOnly) {
            for (let key in basicSeeders){
                if (seederNotExists(basicSeeders[key]))
                    throw _err.createError( _err.getError('SEEDER_NOT_DEFINED') ,`${seederName} seeder not defined`);
                await seeders[basicSeeders[key]].run();
            }
            return;
        }

		for (let key in commonSeeders){
			if (seederNotExists(commonSeeders[key]))
				throw _err.createError( _err.getError('SEEDER_NOT_DEFINED') ,`${seederName} seeder not defined`);
			await seeders[commonSeeders[key]].run();
		}

		if (extras) {
			extras.forEach(seederName => {
				if (seederNotExists(seederName))
					throw _err.createError( _err.getError('SEEDER_NOT_DEFINED'), `${seederName} seeder not defined`);
				seeders[seederName].run()
			})
		}
	}
};