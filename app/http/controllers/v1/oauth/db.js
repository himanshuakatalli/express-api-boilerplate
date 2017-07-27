"use strict";

const mongoose = require('mongoose');

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

    seed (extraSeeds = null) {

    }
};