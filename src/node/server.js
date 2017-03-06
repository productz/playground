// =================================================================
// get the packages we need ========================================
// =================================================================
var express 	= require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var config = require('config'); // get our config file
import schema from './graphql-service/schema';
import { graphql } from 'graphql';

// =================================================================
// configuration ===================================================
// =================================================================
var port = config.get('server.port'); // used to create, sign, and verify tokens
var ip = config.get('server.ip');
mongoose.connect(`${config.get('db.host')}:${config.get('db.port')}`); // connect to database
app.set('superSecret', config.secret); // secret variable

// =================================================================
// Import web services ========================================
// =================================================================
var User   = require('./db-service/user'); // get our mongoose model
import authService from './auth-service/auth-service.js'
const authApi = authService({app,User});

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// =================================================================
// routes ==========================================================
// =================================================================

// parse POST body as text
app.use(bodyParser.text({ type: 'application/graphql' }));

app.post('/graphql', (req, res) => {
  // execute GraphQL!
  graphql(schema, req.body)
  .then((result) => {
    res.send(JSON.stringify(result, null, 2));
  });
});

app.get('/setup', function(req, res) {

	// create a sample user
	var nick = new User({ 
		name: 'Nick Cerminara', 
		password: 'password',
		admin: true 
	});
	nick.save(function(err) {
		if (err) throw err;

		console.log('User saved successfully');
		res.json({ success: true });
	});
});

// basic route (http://localhost:8080)
app.get('/', function(req, res) {
	res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// ==========
// Register Services
// ==========

app.use('/api', authApi);

// =================================================================
// start the server ================================================
// =================================================================
app.listen(port,ip);
console.log('Magic happens at http://localhost:' + port);
