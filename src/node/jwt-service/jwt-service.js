const express = require("express");

var apiRoutes = express.Router();

export default function isAuthenticated({ app, jwt, config }) {
  // route middleware to verify a token
  apiRoutes.use(function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token =
      req.body.token || req.query.token || req.headers["x-access-token"];

    // decode token
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, config.get("secret"), function(err, decoded) {
        if (err) {
          return res.json({
            success: false,
            message: "Failed to authenticate token."
          });
        } else {
          // if everything is good, save to request for use in other routes
          console.log(decoded);
          req.decoded = decoded;
          next();
        }
      });
    } else {
      // if there is no token
      // return an error
      return res.status(403).send({
        success: false,
        message: "No token provided."
      });
    }
  });
  return apiRoutes;
}
