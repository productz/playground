// basic route (http://localhost:8080)
const express = require('express');
import passport from 'passport';

// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
var apiRoutes = express.Router();

export
default
function auth({
    app
}) {
    
    app.use(passport.initialize());
    
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