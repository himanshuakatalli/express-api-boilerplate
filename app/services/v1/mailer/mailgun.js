"use strict";

const mailgun = require('mailgun-js');
const mailerConfig = require('./../../../../config/services/mailer')('mailgun');
const BaseMailer = require('../../../interfaces/base-mailer');

class MailGun extends BaseMailer {

    constructor (config) {
        super(config);
    }

    initialize (config) {
        this.mailer = mailgun({ apiKey: config.apiKey, domain: config.domain });
    }

    sendMail (data) {
        return this.mailer.messages().send(data);
    }
}

module.exports = new MailGun({ apiKey: mailerConfig.apiKey, domain: mailerConfig.domain });