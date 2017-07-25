"use strict";

const mocha = require('mocha');
const chai = require('chai');

const describe = mocha.describe;
const it = mocha.it;
const expect = chai.expect;

const app = require('./../bootstrap/app');

describe("Express Application", function () {

    describe("Application Bootstrapped", function () {
        it ("checks if the application was bootstrapped or not", function () {
            expect(app).to.not.be.a('null');
            expect(app).to.not.be.an('undefined');
        });
    });

    describe("Listen function test", function () {
        it("tests whether there is a listen function or not on app instance", function () {
            expect(app).to.have.property('listen').that.is.a('function');
        });
    });
});