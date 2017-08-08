"use strict";

const express = require('express');
const app = express();

require('../config').init(app);

module.exports = app;