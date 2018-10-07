const express = require("express");
import { executeDomain } from "../utils/utils";

//c,r,u,d is domain logic hooks (before creation, read, update or delete);
//params is something we use to attach this resource to (for example, the current user id so we don't return resources for other users)
export default function({
  Model,
  crudDomainLogic: { create, read, update, del, search }
}) {
  var apiRoutes = express.Router();

  apiRoutes.get("/", function(req, res) {
    let { criteria, isPermitted } = executeDomain(req, res, read);
    if (!isPermitted) {
      return res
        .status(409)
        .send({ message: `You are not authorized to read ${Model.modelName}s` });
    }
    Model.find(criteria)
      .sort("-date")
      .exec((err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }
        res.status(200).send(data);
      });
  });

  apiRoutes.post("/", function(req, res) {
    let newModel = new Model(req.body.model);
    let { criteria, isPermitted } = executeDomain(req, res, create);
    if (!isPermitted) {
      return res.status(409).send({
        message: `You are not authorized to create this ${Model.modelName}`
      });
    }
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
    let { criteria, isPermitted } = executeDomain(req, res, update);
    if (!isPermitted) {
      return res.status(409).send({
        message: `You are not authorized to update this ${Model.modelName}`
      });
    }
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
    let { criteria, isPermitted } = executeDomain(req, res, del);
    if (!isPermitted) {
      return res.status(409).send({
        message: `You are not authorized to delete this ${Model.modelName}`
      });
    }
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
    let { criteria, isPermitted } = executeDomain(req, res, search);
    if (!isPermitted) {
      return res.status(409).send({
        message: `You are not authorized to search ${Model.modelName}s`
      });
    }
    Model.find({ ...query, ...criteria }).exec((err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).send(results);
    });
  });

  return apiRoutes;
}
