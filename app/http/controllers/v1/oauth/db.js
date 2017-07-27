"use strict";

const mongoose = require('mongoose');

const seeders = require('./../../../../../database/seeds');
const response = require('./../../../middlewares/response');

module.exports = {

    reset (req, res) {
        try {
            let droppedCollections = [];
            for (let collectionName in mongoose.connection.collections) {
                droppedCollections.push(collectionName);
                mongoose.connection.collections[collectionName]
                    .drop(error => console.log('Dropping collection  ' + collectionName));
            }
            response.deleted(res, { droppedCollections });
        }

        catch (err) {
            response.error(res, err);
        }
    },

    async seed (req, res) {
        try {
            await seeders.run(null, true);
            response.created(res, { message: "Basic Seeds completed" });
        }

        catch (err) {
            response.error(res, err);
        }
    }
};