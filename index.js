"use strict";

const app = require('./bootstrap/app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.info(`IMS API listening to requests on port ${PORT}`));