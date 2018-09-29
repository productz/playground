const express = require("express");

export default function({ Model }) {
  var apiRoutes = express.Router();
  apiRoutes.get("/", function(req, res) {
    Model.find({})
      .sort("-date")
      .exec((err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }
        res.send(data);
      });
  });
  //models in our database?

  return apiRoutes;
}
