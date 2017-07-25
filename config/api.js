"use strict";

const fs = require('fs');
const join = require('path').join;
const E = require('./../app/helpers/v1/error');

let ACTIVE_APIS = process.env.ACTIVE_APIS ? process.env.ACTIVE_APIS.split(',') : [ 'v1' ];

module.exports = {

    getActiveAPIS () {
		ACTIVE_APIS.forEach(version => {
			if(!fs.existsSync(join(__dirname, '/../routers/routes', version)))
				throw E.createError (
				    E.getError('API_ROUTER_NOT_FOUND'),
                    `Specified API ${version} does not have any routes configuration listed under routers/routes`
                );
		});
		return ACTIVE_APIS;
	}
}