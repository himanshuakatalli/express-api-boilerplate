"use strict";

const app = require('./bootstrap/app');
const PORT = process.env.PORT || 3000;
const clusterBoot = require('./bootstrap/boot');

if (process.env.CLUSTERED === 'true' || process.env.ENV === 'production') {
    clusterBoot();
}
    
else {
    app.listen(PORT, function () {
        console.log(`Process ${process.pid} is listening to all incoming requests on port ${PORT}`);
    });
}