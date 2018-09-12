// =================================================================
// get the packages we need ========================================
// =================================================================
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");
var config = require("config"); // get our config file
var passport = require("passport");
var session = require("express-session");
var jwt = require("jsonwebtoken");

// =================================================================
// configuration ===================================================
// =================================================================
var port = config.get("server.port"); // used to create, sign, and verify tokens
var ip = config.get("server.ip");
mongoose.connect(`${config.get("db.host")}:${config.get("db.port")}`); // connect to database
app.set("superSecret", config.secret); // secret variable

// required for passport session
app.use(
  session({
    secret: "secrettexthere",
    saveUninitialized: true,
    resave: true
  })
);

//CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan("dev"));

// =================================================================
// Import web services ========================================
// ================================================================
import userService from "./db-service/models/user.js";
import chatLogService from "./db-service/models/chat-log";

import helloService from "./hello-service/hello-service.js";
const helloApi = helloService({ app, userService });

import jwtService from "./jwt-service/jwt-service.js";
const jwtApi = jwtService({ app, jwt, config });

//the crud service creates [create, read, update, delete] endpoints for a mongoose model
import crudService from "./crud-service/crud-service.js";
const userApi = crudService({ Model: userService, app });
const chatLogApi = crudService({ Model: chatLogService, app });

//socket service
import socketService from "./socket-service/socket-service.js";
//onEvent is called everytime we recieve a message from a socket
const onEvent = (eventName, eventData) => {
  console.log(eventName, eventData);
};
const chatApi = socketService({ app, onEvent, config });

import passportService from "./passport-service/passport-service.js";

//on verify, we generate a jwt token (for non-web clients) and then we just store the user
const onVerify = ({ accessToken, refreshToken, profile, cb, providerName }) => {
  //add a jwt token for mobile based authentication
  //store the id for providers
  let providerId = `${providerName}Id`;
  let providerAccessToken = `${providerName}AccessToken`;
  let providerRefreshToken = `${providerName}RefreshToken`;
  let user = {
    name: profile.displayName
  };
  let check = {};
  check[providerId] = profile.id;
  user[providerId] = profile.id;
  user[providerAccessToken] = accessToken;
  user[providerRefreshToken] = refreshToken;
  user.id = profile.id;
  let jwtToken = jwt.sign(user, config.get("secret"));
  user.jwtToken = jwtToken;
  userService.findOrCreate(check, user, function(err, user) {
    return cb(err, user);
  });
};
const passportApi = passportService({ app, config, passport, onVerify });

// ==========
// Register Services
// ==========

app.use("/hello", helloApi);
app.use("/", passportApi);
app.use("/api", jwtApi);
app.use("/user", userApi);
app.use("/chat-log", chatLogApi);

// =================================================================
// start the server ================================================
// =================================================================
app.listen(port, ip);
console.log("Magic happens at http://localhost:" + port);
