"use strict";

const oauth2orize = require('oauth2orize');

function TokenGrant (client, user, aresm, done) {
	const token = 'ahsdkhakdhk12h3h1q3e9caxlcnlnaxdup12i9epiqxa;smdlh1231';
	const expiresIn = Date.now();
	done(null, token, expiresIn);
}

module.exports = oauth2orize.grant.token(TokenGrant);
