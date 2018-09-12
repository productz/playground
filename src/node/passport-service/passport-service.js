// basic route (http://localhost:8080)
const express = require("express");
const jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
import googlePassport from "./strategies/google.js";

// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
var apiRoutes = express.Router();

export default function({ app, userService, config, passport }) {
  app.use(passport.initialize());

  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    console.log("serialize");
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    console.log("deserialize");
    done(null, user);
  });

  //on verify
  const onVerify = ({
    accessToken,
    refreshToken,
    profile,
    cb,
    providerName
  }) => {
    //add a jwt token for mobile based authentication
    let providerId = `${providerName}Id`;
    let user = {
      accessToken,
      refreshToken,
      jwtToken,
      name: profile.displayName
    };
    let payload = {
      profile
    };
    let check = {};
    let jwtToken = jwt.sign(payload, config.get("secret"));
    check[providerId] = profile.id;
    user[providerId] = profile.id;
    userService.findOrCreate(check, user, function(err, user) {
      console.log(user);
      return cb(err, user);
    });
  };

  //client ID and secret for google
  let googleClientId = config.get("auth.google.clientId");
  let googleClientSecret = config.get("auth.google.clientSecret");
  let googleCallbackURL = `http://localhost:8080/auth/google/callback`;
  googlePassport({
    passport,
    userService,
    clientId: googleClientId,
    clientSecret: googleClientSecret,
    callbackURL: googleCallbackURL,
    onVerify
  });

  //client Id and secret for other providers

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
