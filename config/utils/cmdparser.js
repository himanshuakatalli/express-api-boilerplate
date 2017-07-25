"use strict";

const parseArgs = require('minimist')

module.exports = {
    loadCmdArgs () {
        const args = parseArgs(process.argv.splice(2));
        for (let key in args)
            if (key !== '_') 
                process.env[key] = args[key]
    }
}