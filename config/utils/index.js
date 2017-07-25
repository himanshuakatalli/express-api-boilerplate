"use strict";

const preload = require('./preload');

module.exports = {
    cmdparser: require('./cmdparser'),

    path: require('./path'),

	preloadAPIFiles (versions) {
    	versions.forEach(version => preload(version));
	}
};