"use strict";

const path = require('path');

const self = module.exports = {
    baseDir: path.join(__dirname, '/../..'),
    controllersDir: path.join(__dirname, '/../../app/http/controllers'),
    middlewareDir: path.join(__dirname, '/../../app/http/middlewares')
}