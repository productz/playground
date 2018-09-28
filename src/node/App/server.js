// =================================================================
// get the packages we need ========================================
// =================================================================
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import config from "config"; // get our config file
import session from "express-session";
import Api from "./api";

// =================================================================
// App ===================================================
// =================================================================
const app = express();

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

const { authApiRoutes, chatApiRoutes, userApiRoutes, jwtApiRoutes } = Api({
  app,
  config
});

app.use("/", authApiRoutes);
app.use("/jwt", jwtApiRoutes);
app.use("/user", userApiRoutes);
app.use("/chat-log", chatApiRoutes);

// =================================================================
// start the server ================================================
// =================================================================
app.listen(port, ip);
console.log("Magic happens at http://localhost:" + port);
