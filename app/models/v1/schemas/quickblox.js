'use strict'

const Schema = require("mongoose").Schema;

module.exports = new Schema({
    quickblox_id: {
        type: String, required: true, unique: true
    },
    login_id: {
        type: String, required: true, trim: true
    },
    quickblox_password: {
        type: String, required: true
    },
    quickblox_name: {
        type: String, required: true
    }, 
    quickblox_ownerid:{
        type: String, required: true
    },
    quickblox_email: {
        type: String, required: true
    },
    quickblox_session: {
        type: String, default: null
    },
    dialog_details: [
        {
            dialog_id: { type: String, unique: true },
            chat_type: { type: String, enum: ['private', 'group'] },
            user_list: [],
            dialog_jid: { type: String, default: null }
        }
    ]

},{
    timestamps: true,
    versionKey: false
});