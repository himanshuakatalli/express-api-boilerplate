"use strict";
const mongoose = require('mongoose');
const User = mongoose.model('User');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const response = require('./../../../../app/http/middlewares/response');
const _hash = require('./../../../../app/helpers/v1/hash');
const _validator = require('./../../../../app/helpers/v1/validator');

const _oauthConfig = {
    usernameField: 'username',
    password: 'password'
};

const _localOauth = async (username, password, done) => {
    try {
        let user = await User.findOne({email: username}).populate('roles');

        if (
            _validator.user.isValidUser(user) &&
            _hash.verifyHashSync(password, user.password) &&
            _validator.user.isAdmin(user)
        ) {
            console.log('Inside if');
            return done(null, user);
        }
    }
    catch(err) {
        console.log(err);
        return done(err);
    }
};

module.exports = {
    strategy: new LocalStrategy(_oauthConfig, _localOauth)
};