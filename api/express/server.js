require('dotenv').config();
const path = require('path');
const cors = require('cors');
const express = require('express');
const serverless = require('serverless-http');
const { auth } = require('express-openid-connect');
const busboy = require('connect-busboy');
const rateLimit = require('express-rate-limit');
const mongoUtil = require('./util/mongo-util');

const appRouter = require('./routes/app');
const mealRouter = require('./routes/meal');
const planRouter = require('./routes/plan');
const settingsRouter = require('./routes/settings');

const port = process.env.PORT || 3030;
const http_port = process.env.HTTP_PORT || 3033;

//const usport = process.env.UNSECURE_LISTEN_PORT || 30000;
//const sslKey = process.env.SSL_KEY;
//const sslCert = process.env.SSL_CERT;

const app = express();
app.use(cors());
app.use(express.static(__dirname + '/'));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false
});

app.use(limiter);

const config = {
    authRequired: process.env.AUTH_REQ,
    auth0Logout: process.env.AUTH_OUT,
    secret: process.env.AUTH_SECRET,
    clientID: process.env.AUTH_CLIENT_ID,
    baseURL: process.env.AUTH_BASE_URL,
    issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL
}

//app.use(utils.jwtCheck);

app.use(auth(config));

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

app.use(busboy());

//const options = {
//    key: sslKey ? fs.readFileSync(sslKey) : null,
//    cert: sslCert ? fs.readFileSync(sslCert) : null
//}

app.use('/.netlify/functions/server/app', appRouter);
app.use('/.netlify/functions/server/meal', mealRouter);
app.use('/.netlify/functions/server/plan', planRouter);
app.use('/.netlify/functions/server/settings', settingsRouter);

//app.use('/', indexRouter);

app.use(function(req, res, next){
    res.status(404).send("Nothing to see here");
});

//app.use(function(req, res, next){
//    res.locals.message = err.message;
//    res.locals.error = req.app.get('env') === 'development' ? err : {};
//    res.status(res.status || 500);
//    res.send('Unknown server error');
//});

//http.createServer(app).listen(`${http_port}`, () => {
//    console.log(`Server listening on secured port ${port}`);
//})
 
//https.createServer(options.cert && options.key ? options : {}, app).listen(port, () => {
//    console.log(`Server listening on port ${port}`);
//});

/* removing, not used for serverless functions 
mongoUtil.connectToServer((err, database) => {
    if(err){
        console.error(err);
    }
    if(database){
        console.debug("connected to database");
    }
});
*/
//app.listen(port, () => {
//    console.log(`listening on port ${port}`);
//});

module.exports = app;
module.exports.handler = serverless(app);
