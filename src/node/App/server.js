// =================================================================
// get the packages we need ========================================
// =================================================================
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import config from "config"; // get our config file
import session from "express-session";
import Api from "./api";
import MongoDb from "./MongoDb";

// =================================================================
// App ===================================================
// =================================================================
const app = express();

// =================================================================
// configuration ===================================================
// =================================================================
app.set("superSecret", config.secret); // secret variable

// required for passport session auth
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

//models: mongoose models
//schemas: the schema of each model
//onDb init
const onInit = (models, schemas) => {
  const {
    authApiRoutes,
    chatApiRoutes,
    userApiRoutes,
    jwtApiRoutes,
    houseApiRoutes,
    localizationApiRoutes
  } = Api({
    app,
    config
  });
  app.use("/", authApiRoutes);
  app.use("/", ...localizationApiRoutes);
  app.use("/jwt", jwtApiRoutes);
  app.use("/user", ...userApiRoutes);
  app.use("/house", ...houseApiRoutes);
  app.use("/chat-log", jwtApiRoutes, ...chatApiRoutes);
  app.use("/schemas", (req, res, next) => {
    res.send(schemas);
  });
};

//if there is an error connecting to db, there is no point in mounting routes
//just display to the user there is an error connecting to db
// we could also use this to fall back to some local storage
const onError = err => {
  //routes that don't require db connection
  app.use("/", (req, res, next) => {
    return res.status(500).send(err);
  });
};
const onDisconnect = () => {
  console.log("db disconnected");
};
const dbConnection = MongoDb({ app, config, onInit, onError, onDisconnect });

// =================================================================
// start the server ================================================
// =================================================================
var port = config.get("server.port"); // used to create, sign, and verify tokens
var ip = config.get("server.host");
app.listen(port, ip);
console.log(`Magic happens at ${ip}:${port}`);
