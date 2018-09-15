const express = require("express");
const jwt = require("jsonwebtoken");
var apiRoutes = express.Router();

export const isAuthenticated = (token, secret) => {
  // verifies secret and checks exp
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

export default function jwtService({ secret }) {
  // route middleware to verify a token
  apiRoutes.use("/api", function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token =
      req.body.token || req.query.token || req.headers["x-access-token"];

    // decode token
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, secret, function(err, decoded) {
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

  apiRoutes.post("/is-auth", (req, res) => {
    var token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    isAuthenticated(token, secret)
      .then(() => {
        res.status(200).send("success");
      })
      .catch(err => {
        res.status(401).send(err);
      });
  });
  return apiRoutes;
}
