// basic route (http://localhost:8080)
const express = require("express");

// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
var apiRoutes = express.Router();

//maybe this service is responsible for managing models and storing them?
export default function({ app }) {
  apiRoutes.get("/", function(req, res) {
    res.send("Hello! DB service is working");
  });
  return apiRoutes;
}
