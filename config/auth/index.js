"use strict";
const oauth = require('./oauth')
const passportStrategies = require('./passport');

const self = module.exports = {

	initializeOauthServer (routers) {
		oauth
			.setupExchanges()
			.setupAuthRoutes(routers)
		return self;
	},

    configure(driver) {
        
        switch(driver.name) {
            case 'passport':
            	for (let strategyName in passportStrategies)
            		driver.driver.use(strategyName, passportStrategies[strategyName].strategy);
        }
    }
}