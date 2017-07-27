"use strict";

const fs = require('fs');
const path = require('path');
const express = require('express');

const E = require('./../app/helpers/v1/error');
const response = require('../app/http/middlewares/response');

const self = module.exports = {
    
    getRouter(version = '') {

        if (version === '') {
            version = 'root.js'
        }
        
        const routesDir = path.join(__dirname, `/routes/${version}`);

        console.log(routesDir);

        if (!fs.existsSync(routesDir))
            throw E.createError(E.getError('ROUTER_NOT_DEFINED'), `Router version ${version} does not exists`);

        const routes = require(routesDir);
        const router = self.initializeRouter(routes, version);
        return router;
    },

    initializeRouter (routes, version) {

        const router = express.Router();

        router.use(response.appendAPIVersion(version));

        routes.forEach(route => {
            if (!self.handlersAreFunctions(route.handlers))
				throw E.createError(E.getError('UNSUPPORTED_ROUTER_HANDLERS'), 'Handlers must be of type Function');
            
            switch(route.method) {
                case 'GET':
                    router.get(route.path, route.handlers);
                    break;

                case 'POST':
                    router.post(route.path, route.handlers);
                    break;

                case 'PUT':
                    router.put(route.path, route.handlers);
                    break;

                case 'DELETE':
                    router.delete(route.path, route.handlers);
                    break;
            }
        })

        return router;
    },

    handlersAreFunctions(handlers) {
        return handlers.every(handler => typeof handler === 'function')
    }
}