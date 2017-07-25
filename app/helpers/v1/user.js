'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('User');
const _hash = require('./hash');
const _validator = require('./validator');
const _error = require('./error');

module.exports = {
    async updateDetails(user = null, email, data) {
        if (email)
            return await User.findOneAndUpdate({ email }, data, { new: true });
    },
    async changePassword(user = null, email, data) {
        if (email) {
            let user = await User.findOne({ email: email });
            console.log('Users Done', user);
            if (_validator.user.isValidUser(user)) {
                console.log('Done1111111');
                console.log('Data Password::', data.oldPassword);
                if (_hash.verifyHashSync(data.oldPassword, user.password)) {
                    user.password = data.password;
                    return await user.save();
                }
                else {
                    console.log('In Else');
                    throw _error.createError(_error.getError('CREDENTIALS_INCORRECT'), 'Old password does not match');
                }
            }
        }
    },

    async forgetPassword(user = null, email, data) {
        if (email) {
            let user = await User.findOne({ email: email });
            if (_validator.user.isValidUser(user)) {
                user.password = data.password;
                return awaituser.save();
            }
        }
    }
}