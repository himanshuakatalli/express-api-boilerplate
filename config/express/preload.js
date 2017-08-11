"use strict";

const fs = require('fs');
const env = require('../environments');
const { logger } = require('../logger');

module.exports = (version) => {
    logger.info(`Preloading files for api ${version}`);
	// Bootstrap schemas
	const schemas = `${env.ROOT_DIR}/app/models/${version}/schemas`;
	fs.readdirSync(schemas)
		.filter(file => ~file.search(/^[^\.].*\.js$/))
		.forEach(file => require(join(schemas, file)));

	// Bootstrap models
	const models = `${env.ROOT_DIR}/app/models/${version}`;
	fs.readdirSync(models)
		.filter(file => ~file.search(/^[^\.].*\.js$/))
		.forEach(file => require(join(models, file)));

	// Register events
    const events = `${env.ROOT_DIR}/app/events/${version}`;
    fs.readdirSync(events)
        .filter(file => ~file.search(/^[^\.].*\.js$/))
        .forEach(file => require(join(events, file)));
};