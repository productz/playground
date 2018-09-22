// basic route (http://localhost:8080)
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

  apiRoutes.post("/", function(req, res) {
    let newModel = new Model(req.body);
    newModel.save(newModel, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      console.log(data);
      res.send(data);
    });
  });

  apiRoutes.put("/", (req, res) => {
    //take the imported Model, format it and add it to the Models collection
    let requestModel = req.body;
    let newModel = Object.assign({}, requestModel);
    Model.findOneAndUpdate(
      { _id: requestModel._id },
      newModel,
      {
        upsert: false
      },
      function(err, doc) {
        if (err) return res.send(500, { error: err });
        res.send(newModel);
      }
    );
  });

  apiRoutes.delete("/", (req, res) => {
    let requestModel = req.body;
    //remove the imported Model
    Model.find({
      _id: requestModel["_id"]
    })
      .remove()
      .exec(err => {
        if (err) {
          return res.status(500).send(err);
        }
        res.status(200).send();
      });
  });

  apiRoutes.post("/search", (req, res) => {
    let query = req.body;
    Model.find(query).exec((err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).send(results);
    });
  });

  return apiRoutes;
}
