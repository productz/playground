const express = require("express");
import { executeDomain } from "../utils/utils";

export default function({
  Model,
  domainLogic: { average, min, max, count, distinct, sum }
}) {
  var apiRoutes = express.Router();

  apiRoutes.get("/count", function(req, res) {
    let criteria = executeDomain(req, res, count);
    Model.count(criteria).exec((err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      res.status(200).send({ count: data });
    });
  });

  apiRoutes.get("/max/:field", function(req, res) {
    let criteria = executeDomain(req, res, max);
    let field = req.params.field;
    Model.findOne(criteria)
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
    let criteria = executeDomain(req, res, min);
    let field = req.params.field;
    Model.findOne(criteria)
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
    let criteria = executeDomain(req, res, sum);
    let field = req.params.field;
    Model.aggregate(
      [
        { $match: criteria },
        {
          $group: {
            _id: {},
            sum: { $sum: `$${field}` }
          }
        }
      ],
      (err, data) => {
        if (err) {
          return res.status(500).send(err);
        }
        return res.send({ res: data[0] });
      }
    );
  });

  apiRoutes.get("/average/:field", function(req, res) {
    let criteria = executeDomain(req, res, average);
    let field = req.params.field;
    Model.aggregate(
      [
        { $match: criteria },
        {
          $group: {
            _id: {},
            average: { $avg: `$${field}` }
          }
        }
      ],
      (err, data) => {
        if (err) {
          return res.status(500).send(err);
        }
        return res.send({ res: data[0] });
      }
    );
  });

  apiRoutes.get("/distinct/:field", function(req, res) {
    let criteria = executeDomain(req, res, distinct);
    let field = req.params.field;
    Model.find(criteria).distinct(field, function(err, data) {
      if (err) {
        return res.status(500).send(err);
      }
      return res.send(data);
    });
  });

  return apiRoutes;
}
