const mongoUtil = require('./mongo-util');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

module.exports = {
    jwtCheck: (force) => {
        return jwt({
            secret: jwks.expressJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: 'https://dev-09xhkep2.eu.auth0.com/.well-known/jwks.json'
            }),
            audience: process.env.AUTH_AUDIENCE,
            issuer: 'https://dev-09xhkep2.eu.auth0.com/',
            algorithms: ['RS256'],
            credentialsRequired: force

        });
    }
}