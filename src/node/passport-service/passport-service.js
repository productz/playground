// basic route (http://localhost:8080)
const express = require('express');
import passport from 'passport';
import googlePassport from './strategies/google.js';

// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
var apiRoutes = express.Router();

export
default
function({
    app,
    User,
    config
}) {
    
    app.use(passport.initialize());
    
    googlePassport({passport,User,config});
    
    apiRoutes.get('/', function(req, res) {
        res.send('Hello! Hello service is working');
    });
    
    apiRoutes.post('/login',
        passport.authenticate('local', {
            failureRedirect: '/login'
        }),
        function(req, res) {
            res.redirect('/');
        });
        
    return apiRoutes;
}