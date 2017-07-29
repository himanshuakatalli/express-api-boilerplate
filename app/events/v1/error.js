"use strict";
const event = require('../index');

event.on('ERROR', function (err) {
    if (process.env.ENV === 'development') {
        console.log(err);
    }
});