// basic route (http://localhost:8080)
const express = require("express");
var apiRoutes = express.Router();

export default function({ app, Model }) {

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
    Model.save(newModel, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      res.send(data);
    });
  });

  apiRoutes.put("/", (req, res) => {
    //take the imported Model, format it and add it to the Models collection
    let Model = req.body;
    let newModel = {
      title: Model.title,
      amount: Model.amount,
      date: Model.date,
      tags: Model.tags
    };
    Model.findOneAndUpdate(
      { _id: Model._id },
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

  apiRoutes.post("/", function(req, res) {
    let newModel = new Model(req.body);
    Model.save(newModel, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      res.send(data);
    });
  });

  apiRoutes.delete("/", (req, res) => {
    let Model = req.body;
    //remove the imported Model
    Model.find({
      _id: Model["_id"]
    })
      .remove()
      .exec(err => {
        if (err) {
          return res.status(500).send(err);
        }
        res.status(200).send();
      });
  });

  return apiRoutes;
}
