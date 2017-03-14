// basic route (http://localhost:8080)
const express = require('express');
import passport from 'passport';
import config from 'config';
var GoogleStrategy = require('passport-google-oauth20').Strategy;

// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
var apiRoutes = express.Router();

export default function auth({
    app,
    User
}) {
    
    app.use(passport.initialize());
    
    passport.use(new GoogleStrategy({
            clientID: config.get('auth.google.client_id'),
            clientSecret: config.get('auth.google.client_secret'),
            callbackURL: "playground-test-itechdom.c9users.io/auth/google/callback"
        },
        function(accessToken, refreshToken, profile, cb) {
            User.findOrCreate({
                googleId: profile.id
            }, function(err, user) {
                return cb(err, user);
            });
        }
    ));
    
    apiRoutes.get('/auth/google',
        passport.authenticate('google', {
            scope: ['profile']
        }));
        
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/login'
        }),
        function(req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        });
        
    apiRoutes.get('/', function(req, res) {
        res.send('Hello! Hello service is working');
    });
        
    return apiRoutes;
}