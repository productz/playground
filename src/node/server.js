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
var ip = config.get("server.host");
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
const jwtApi = jwtService({ secret: config.get("secret") });

// =================================================================
// Create some crud services ========================================
// ================================================================

//the crud service creates [create, read, update, delete] endpoints for a mongoose model
import crudService from "./crud-service/crud-service.js";
const userApi = crudService({ Model: userService });
const chatLogApi = crudService({ Model: chatLogService });

// =================================================================
// Open a socket ========================================
// ================================================================

//socket service
import socketService from "./socket-service/socket-service.js";
//onEvent is called everytime we recieve a message from a socket
const onEvent = (eventName, eventData) => {
  console.log(eventName, eventData);
};
const channel = "chat";
const chatApi = socketService({ app, onEvent, config, channel });

// =================================================================
// Setup Auth ========================================
// ================================================================

import passportService from "./passport-service/passport-service.js";

//on verify, we generate a jwt token (for non-web clients) and then we just store the user
const onVerify = ({
  accessToken,
  refreshToken,
  profile,
  cb,
  providerName,
  username,
  password
}) => {
  //add a jwt token for mobile based authentication
  //store the id for providers
  if ((providerName = "local")) {
    return userService.findOne({ email: username }, function(err, user) {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      if (!user.verifyPassword(password)) {
        return cb(null, false);
      }
      //issue a new jwt token
      let jwtToken = jwt.sign(user, config.get("secret"));
      user.jwtToken = jwtToken;
      return cb(null, user);
    });
  }
  //third party providers
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

const onRegister = (values, req, res) => {
  let user = new userService(values);
  //do I generate an auth token?
  //register a user
  user.save(err => {
    if (err) {
      return res.status(500).send(err);
    }
  });
};

const onSuccess = (providerName, user, res) => {
  let redirectUrl = `${config.get("redirectUrl")}?jwt=${user.jwtToken}`;
  if (providerName !== "local") {
    return res.redirect(redirectUrl);
  }
  user["password"] = "";
  return res.status(200).send(user);
};

const onLoginFail = (req, res, message) => {
  //in case the auth doesn't works
  res.status(401).send("Error logging in");
};
const passportApi = passportService({
  app,
  config,
  passport,
  onVerify,
  onSuccess,
  onLoginFail,
  onRegister
});

// =================================================================
// Register Services Routes
// =================================================================

app.use("/hello", helloApi);
app.use("/", passportApi);
app.use("/jwt", jwtApi);
app.use("/user", userApi);
app.use("/chat", chatApi);
app.use("/chat-log", chatLogApi);

// =================================================================
// start the server ================================================
// =================================================================
app.listen(port, ip);
console.log("Magic happens at http://localhost:" + port);
