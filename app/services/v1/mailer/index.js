"use strict";

module.exports = {
    mailgun: require('./mailgun')
}[ process.env.ACTIVE_MAILER || 'mailgun' ]