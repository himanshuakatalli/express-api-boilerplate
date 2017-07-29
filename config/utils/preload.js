"use strict";

const fs = require('fs');
const join = require('path').join;

module.exports = (version) => {
	// Bootstrap schemas
	const schemas = join(__dirname, './../../app/models/'+ version +'/schemas');
	fs.readdirSync(schemas)
		.filter(file => ~file.search(/^[^\.].*\.js$/))
		.forEach(file => require(join(schemas, file)));

	// Bootstrap models
	const models = join(__dirname, './../../app/models/' + version);
	fs.readdirSync(models)
		.filter(file => ~file.search(/^[^\.].*\.js$/))
		.forEach(file => require(join(models, file)));

    // Register all events
    const events = join(__dirname, '../../app/events/' + version);
    fs.readdirSync(events)
        .filter(file => ~file.search(/^[^\.].*\.js$/))
        .forEach(file => require(join(events, file)));
}