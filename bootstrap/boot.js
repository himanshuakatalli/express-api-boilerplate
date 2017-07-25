"use strict";

const cluster = require('cluster');
const maxWorkers = require('os').cpus().length;

const app = require('./app')
const PORT = process.env.PORT || 3000;

module.exports = function () {

    if(cluster.isMaster) {

        console.log('Master cluster setting up ' + maxWorkers + ' workers...');

        for(var i = 0; i < maxWorkers; i++)
            cluster.fork();

        cluster.on('online', (worker) => console.log('Worker ' + worker.process.pid + ' is online'));

        cluster.on('exit', (worker, code, signal) => {
            console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
            console.log('Starting a new worker');
            cluster.fork();
        });

    } else {

        const server = app.listen(PORT, () => {
            console.log(`Process ${process.pid} is listening to all incoming requests on port ${PORT}`);
        })
        app.all('/*', (req, res) => {
            res.send('process ' + process.pid + ' says hello!').end();
        })
    }
}