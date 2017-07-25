"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const _hash = require('./../../../helpers/v1/hash');

const UserSchema = new Schema(
    {
        'email': {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        'password': {
            type: String,
            required: true,
			set: _hashPassword
        },

        'roles': [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role'
        }],

        'universities': [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'University',
                default: null
            }
        ],

        'verified': {
            type: Boolean,
            default: false
        },

		'verification_hash': {
        	type: String,
			default: null
		},

        'metas': [
            {
                key: {
                    type: String,
                    default: null
                },
                value: {
                    type: String,
                    default: null
                }
            }
        ]
    },
    {
        timestamps: true,
        autoIndex: true,
        versionKey: false
    }
);

UserSchema.virtual('fullname').set(function (fullname) {
	let name = fullname.split(' ');
	let data = [
        { key: 'firstname', value: name[0] || fullname },
        { key: 'lastname', value: name[1] || null }
    ];
	this.metas.push(...data);
})

function _hashPassword (password) {
	return _hash.generateHashSyncFor(password);
}

module.exports = UserSchema;