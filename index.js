"use strict";

const env = require('./config/environments');
const app = require('./bootstrap/app');
const PORT = env.PORT || 3000;

const { logger } = require('./config/logger');

app.listen(PORT, () => logger.info(`IMS API listening to requests on port ${PORT}`));