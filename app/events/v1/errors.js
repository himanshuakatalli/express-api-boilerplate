"use strict";

const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('ERROR', error => {
    console.log('Logger will log everything here');
})