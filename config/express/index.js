"use strict";

const bodyParser = require('body-parser');
const cors = require('cors');

const self = module.exports = {
    
    setupApp (app) {
        app.disable('x-powered-by');
        app.set('env', process.env.ENV);
        app.use(cors());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        return self
    },

    setupRouters(app, routers) {
        routers.forEach(router => app.use(router.mountPoint, router.router));
        return self;
    }
}