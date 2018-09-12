// basic route (http://localhost:8080)
const express = require("express");
import googlePassport from "./strategies/google.js";

// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
var apiRoutes = express.Router();

export default function({ app, userService, config, passport }) {

  app.use(passport.initialize());

  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    console.log("serialize is called");
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    console.log("DEserialize is called");
    done(null, user);
  });

  //client ID and secret
  let googleClientId = config.get("auth.google.clientId");
  let googleClientSecret = config.get("auth.google.clientSecret");
  let googleCallbackURL = `http://localhost:8080/auth/google/callback`;
  googlePassport({
    passport,
    userService,
    clientId: googleClientId,
    clientSecret: googleClientSecret,
    callbackURL: googleCallbackURL
  });

  apiRoutes.get("/", function(req, res) {
    res.send("Hello! Hello service is working - from passport-service.js");
  });

  apiRoutes.get("/error", function(req, res) {
    console.log("RESPONSE >>>>>>>>");
  });

  apiRoutes.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile"]
    })
  );

  apiRoutes.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/error"
    }),
    (req, res) => {
      // Successful authentication, redirect home.
      res.redirect("/hello");
    }
  );
  return apiRoutes;
}
