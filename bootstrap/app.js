"use strict";

require('dotenv').config();
require('../config/utils/index').cmdparser.loadCmdArgs();

const express = require('express');
const app = express();

require('../config/index')(app);

module.exports = app;