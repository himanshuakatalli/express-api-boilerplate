"use strict";

const { logger } = require('./config/logger');
const app = require('./bootstrap/app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => logger.info(`IMS API listening to requests on port ${PORT}`));