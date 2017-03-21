// basic route (http://localhost:8080)
const express = require('express');

// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
var apiRoutes = express.Router();

export default function auth({
    app
}) {
    
    apiRoutes.get('/', function(req, res) {
        res.send('Hello! this is budgetqt backend!');
    });
    
    apiRoutes.get('/expenses', function(req, res) {
        res.send(['expenses']);
    });
    
    apiRoutes.post('/expenses/upload/csv', function(req, res) {
        res.send('hi, hree you cna uplaod csv');
    });
    
    return apiRoutes;
}