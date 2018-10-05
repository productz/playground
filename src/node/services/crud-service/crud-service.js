const express = require("express");
import { executeDomain } from "../utils/utils";

//c,r,u,d is domain logic hooks (before creation, read, update or delete);
//params is something we use to attach this resource to (for example, the current user id so we don't return resources for other users)
export default function({ Model, crudDomainLogic: { c, r, u, d, s } }) {
  var apiRoutes = express.Router();

  apiRoutes.get("/", function(req, res) {
    let criteria = executeDomain(req, res, r);
    Model.find(criteria)
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
    let newModel = new Model(req.body.model);
    newModel.save(err => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      res.send(newModel);
    });
  });

  apiRoutes.put("/", (req, res) => {
    //take the imported Model, format it and add it to the Models collection
    let criteria = executeDomain(req, res, u);
    let requestModel = req.body.model;
    let newModel = Object.assign({}, requestModel);
    Model.findOneAndUpdate(
      { _id: requestModel._id, ...criteria },
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

  apiRoutes.delete("/:_id", (req, res) => {
    let requestModelID = req.params._id;
    let criteria = executeDomain(req, res, d);
    Model.find({
      _id: requestModelID,
      ...criteria
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
    let criteria = executeDomain(req, res, s);
    Model.find({ ...query, ...criteria }).exec((err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).send(results);
    });
  });

  return apiRoutes;
}
