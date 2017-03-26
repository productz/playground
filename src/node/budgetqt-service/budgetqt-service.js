// basic route (http://localhost:8080)
const express = require('express');
var busboy = require('connect-busboy');
var csv = require('csv-parser')
import parser from './data-parser/data-parser.js';

// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
var apiRoutes = express.Router();

export default function({
    app,
    Expense,
    ImportedExpense
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
        Expense.find({}, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            res.send(data);
        });
    });
    
    apiRoutes.post('/expenses', function(req, res) {
        let newExpense = new Expense(req.body);
        Expense.save(newExpense, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            res.send(data);
        });
    });
    
    apiRoutes.get('/expenses/imported', (req, res)=>{
        ImportedExpense.find({},(err,data)=>{
            if(err){
                console.log(err);
                return res.status(500).send(err);
            }
            res.send(data);
        });
    })
    
    apiRoutes.post('/expenses/upload/csv', function(req, res) {
        if (req.busboy) {
            req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
                file.pipe(csv()).on('data',(entry)=>{
                    var expense = parser({entry});
                    expense.file = filename;
                    let newExpense = new ImportedExpense(expense);
                    newExpense.save((err)=>{
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log("SAVED EXPENSE!");
                        }
                    })
                })
            });
            req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {});
            req.pipe(req.busboy);
        }
        res.send('You have uploaded the file!');
    });
    
    return apiRoutes;
}