// basic route (http://localhost:8080)
const express = require('express');
var busboy = require('connect-busboy');

// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
var apiRoutes = express.Router();

export default function auth({
    app
}) {
    
    //busboy is for uploading multipart forms (csv files here)
    app.use(busboy());

    app.use(function(req, res,next) {
        next();
    });
    
    apiRoutes.get('/', function(req, res) {
        res.send('Hello! this is budgetqt backend!');
    });
    
    apiRoutes.get('/expenses', function(req, res) {
        res.send(['expenses']);
    });
    
    apiRoutes.post('/expenses/upload/csv', function(req, res) {
        if (req.busboy) {
            req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
                console.log("busboy:", file.pipe(process.stdout));
            });
            req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {});
            req.pipe(req.busboy);
        }
        res.send('You have uploaded the file!');
    });
    
    return apiRoutes;
}