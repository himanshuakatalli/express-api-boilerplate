"use strict";

const app = require('./bootstrap/app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
    console.log(`Express app listening on PORT ${PORT}`);
});