// basic route (http://localhost:8080)
const express = require('express');
import passport from 'passport';
import googlePassport from './strategies/google.js';
//twitter
//facebook

// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
var apiRoutes = express.Router();

export
default

function({
    app,
    userService,
    config
}) {

    app.use(passport.initialize());

    //client ID and secret
    let googleClientId = config.get("auth.google.clientId");
    let googleClientSecret = config.get("auth.google.clientSecret");
    let googleCallbackURL = `${config.get('server.ip')}:${config.get('server.port')}/auth/google/callback`;
    googlePassport({
        passport,
        userService,
        clientId:googleClientId,
        clientSecret:googleClientSecret,
        callbackURL: googleCallbackURL
    });

    apiRoutes.get('/', function(req, res) {
        console.log(res);
        res.send('Hello! Hello service is working');
    });
    
    apiRoutes.get('/error',function(req,res){
        console.log("RESPONSE >>>>>>>>");
        console.log(res);
    })
    
    apiRoutes.get('/auth/google',
        passport.authenticate('google', {
            scope: ['profile']
        }));

    apiRoutes.get('/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/error'
        }),
        (req, res) => {
            // Successful authentication, redirect home.
            res.redirect('/hello');
        });
    return apiRoutes;
}