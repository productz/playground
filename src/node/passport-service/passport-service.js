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
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
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

  apiRoutes.get("/google/error", function(req, res) {
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
  return apiRoutes;
}
