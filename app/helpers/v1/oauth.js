"use strict";

const envConfig = require('./../../../config/environments');

const __mailer = require('./../../services/v1/mailer');

module.exports = {

    sendAccountVerificationEmail (hash, to, from, subject, body = null) {
        const verificationLink = `${envConfig.appURL}/oauth/verify/${to}&${hash}`;
        const emailData = {
            to,
            from,
            subject: 'Verify your account',
            html: `<h3>Verify your account</h3><br><a href="${verificationLink}">${verificationLink}</a>`
        };
        return __mailer.sendMail(emailData);
    }
}