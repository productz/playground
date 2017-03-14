// basic route (http://localhost:8080)

const express = require('express');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
var apiRoutes = express.Router();

export default function auth({
    app
}) {
    apiRoutes.get('/', function(req, res) {
        res.send('Hello! Hello service is working');
    });
    return apiRoutes;
}