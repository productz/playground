// basic route (http://localhost:8080)
const express = require("express");
import googlePassport from "./strategies/google.js";
import twitterPassport from "./strategies/twitter.js";
import facebookPassport from "./strategies/facebook.js";

// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
var apiRoutes = express.Router();

export default function({ app, config, passport, onVerify }) {
  app.use(passport.initialize());

  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  //client ID and secret for google
  let googleClientId = config.get("auth.google.clientId");
  let googleClientSecret = config.get("auth.google.clientSecret");
  let googleCallbackURL = `http://localhost:8080/auth/google/callback`;
  googlePassport({
    passport,
    clientId: googleClientId,
    clientSecret: googleClientSecret,
    callbackURL: googleCallbackURL,
    onVerify
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
      failureRedirect: "/google/error"
    }),
    (req, res) => {
      let redirectUrl = `${config.get("redirectUrl")}?jwt=${req.user.jwtToken}`;
      res.redirect(redirectUrl);
    }
  );

  //client ID and secret for twitter
  // let twitterClientId = config.get("auth.twitter.clientId");
  // let twitterClientSecret = config.get("auth.twitter.clientSecret");
  // let twitterCallbackURL = `http://localhost:8080/auth/twitter/callback`;
  // twitterPassport({
  //   passport,
  //   clientId: twitterClientId,
  //   clientSecret: twitterClientSecret,
  //   callbackURL: twitterCallbackURL,
  //   onVerify
  // });
  app.get("/auth/twitter", passport.authenticate("twitter"));

  app.get(
    "/auth/twitter/callback",
    passport.authenticate("twitter", { failureRedirect: "/login" }),
    function(req, res) {
      // Successful authentication, redirect home.
      let redirectUrl = `${config.get("redirectUrl")}?jwt=${req.user.jwtToken}`;
      res.redirect(redirectUrl);
    }
  );

  //client ID and secret for twitter
  // let facebookClientId = config.get("auth.facebook.clientId");
  // let facebookClientSecret = config.get("auth.facebook.clientSecret");
  // let facebookCallbackURL = `http://localhost:8080/auth/facebook/callback`;
  // facebookPassport({
  //   passport,
  //   clientId: facebookClientId,
  //   clientSecret: facebookClientSecret,
  //   callbackURL: facebookCallbackURL,
  //   onVerify
  // });
  app.get("/auth/facebook", passport.authenticate("facebook"));

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/login" }),
    function(req, res) {
      // Successful authentication, redirect home.
      let redirectUrl = `${config.get("redirectUrl")}?jwt=${req.user.jwtToken}`;
      res.redirect(redirectUrl);
    }
  );

  return apiRoutes;
}
