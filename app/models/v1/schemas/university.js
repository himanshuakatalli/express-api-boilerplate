'Use Strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        image: {
            type: String,
            default: null
        },
        description: {
            type: String,
            trim: true,
            default: null,
        },
        address: {
            type: String,
            trim: true,
            default: null
        },
        contact: {
            type: String,
            trim: true,
            default: null,
        }
    },
    {
        autoIndex: true,
        timestamps: true,
        versionKey: false
    }
);