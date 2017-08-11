"use strict";

const fs = require('fs');
const express = require('express');
const env = require('../environments');
const _err = require('../../app/helpers/v1/error');
const response = require('../../app/middlewares/response');

const ACTIVE_APIS = require('./api');

const ensureFunctionHandlers = (handlers) => handlers.every(handler => typeof(handler) === 'function');

exports.getConfiguredRouters = function () {
    const BASE_ROUTER_CONFIG = { version: '', mountPoint: '', router: exports.getRouter() };
    let API_ROUTERS = ACTIVE_APIS.map(version => Object.assign({}, {
        version,
        'mountPoint': '/api/' + version,
        'router': exports.getRouter(version),
    }));
    API_ROUTERS.push(BASE_ROUTER_CONFIG);
    return API_ROUTERS;
};

exports.getRouter = function (version = '') {
    const routesDir = version ? `${env.ROOT_DIR}/routes/${version}`: `${env.ROOT_DIR}/routes/root.js`;
    if (!fs.existsSync(routesDir))
        _err.createError('ROUTES_NOT_DEFINED', `Routes dir ${routesDir} not present`);

    return exports.initializeRouter(require(routesDir), version);
};

exports.initializeRouter = function (routes, version) {

    response.appendAPIVersion(version);
    
    const router = express.Router();

    routes.forEach(route => {

        if (!ensureFunctionHandlers(route.handlers))
            throw _err.createError(
                'HANDLER_TYPE_NOT_SUPPORTED', 
                `Handlers for route ${route.path} are not functions`
            );

        switch (route.method) {
            case 'GET':
                router.get(route.path, ...route.handlers);
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

            case 'ALL':
                router.all(route.path, route.handlers);
                break;
        };
    });

    return router;
};