const express = require("express");

//c,r,u,d is domain logic hooks (before creation, read, update or delete);
//params is something we use to attach this resource to (for example, the current user id so we don't return resources for other users)
export default function({ Model, crudDomainLogic: { c, r, u, d, s } }) {
  var apiRoutes = express.Router();

  apiRoutes.get("/", function(req, res) {
    let user = req.decoded && req.decoded._doc;
    let { shallIPass, criteria } = r(user);
    if (!shallIPass) {
      return res.status(403).send("Sorry, you don't have the right privileges");
    }
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
    let user = req.decoded && req.decoded._doc;
    let { shallIPass, criteria } = c(user);
    let newModel = new Model(req.body.model);
    if (!shallIPass) {
      return res.status(403).send("Sorry, you don't have the right privileges");
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
    let user = req.decoded && req.decoded._doc;
    let { shallIPass, criteria } = u(user);
    let requestModel = req.body.model;
    let newModel = Object.assign({}, requestModel);
    if (!shallIPass) {
      return res.status(403).send("Sorry, you don't have the right privileges");
    }
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

  apiRoutes.delete("/:_id", (req, res) => {
    let user = req.decoded && req.decoded._doc;
    let { shallIPass, criteria } = d(user);
    let requestModelID = req.params._id;
    //remove the imported Model
    if (!shallIPass) {
      return res.status(403).send("Sorry, you don't have the right privileges");
    }
    Model.find({
      _id: requestModelID
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
    let user = req.decoded && req.decoded._doc;
    let query = req.body;
    let shallIPass = s(user);
    Model.find(query).exec((err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).send(results);
    });
  });

  return apiRoutes;
}
