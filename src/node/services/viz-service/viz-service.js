const express = require("express");

export default function({ Model }) {
  var apiRoutes = express.Router();

  apiRoutes.get("/count", function(req, res) {
    Model.count({}).exec((err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      res.status(200).send({ count: data });
    });
  });

  apiRoutes.get("/max/:field", function(req, res) {
    let field = req.params.field;
    Model.findOne({})
      .sort(`-${field}`)
      .exec((err, data) => {
        if (err) {
          console.log("err", err);
          return res.status(500).send(err);
        }
        res.status(200).send({ max: data[`${field}`] });
      });
  });

  apiRoutes.get("/min/:field", function(req, res) {
    let field = req.params.field;
    Model.findOne({})
      .sort(`+${field}`)
      .exec((err, data) => {
        if (err) {
          console.log(err);
          return res.setStatus(500).send(err);
        }
        res.status(200).send({ min: data[`${field}`] });
      });
  });

  apiRoutes.get("/sum/:field", function(req, res) {
    let field = req.params.field;
    Model.aggregate(
      [
        {
          $group: {
            _id: {},
            sum: { $sum: `$${field}` },
            count: { $sum: 1 }
          }
        }
      ],
      (err, data) => {
        if (err) {
          return res.status(500).send(err);
        }
        return res.send(data[0]);
      }
    );
  });

  apiRoutes.get("/average/:field", function(req, res) {
    let field = req.params.field;
    Model.find({})
      .sort(`-${field}`)
      .exec((err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }
        res.send(data);
      });
  });

  return apiRoutes;
}
