const express = require("express");
import { executeDomain } from "../utils/utils";

export function formsService({ Model, formsDomainLogic: { read } }) {
  var apiRoutes = express.Router();

  apiRoutes.get("/forms", function(req, res) {
    let { criteria, isPermitted } = executeDomain(req, res, read);
    if (!isPermitted) {
      return res.status(409).send({
        message: `You are not authorized to read ${Model.modelName}s`
      });
    }
    Model.findOne(criteria)
      .sort("-date")
      .exec((err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
        res.status(200).send(data);
      });
  });

  return apiRoutes;
}

export const registerForms = ({ key, fields, formsModel }) => {
  let lookUpKey = key;
  // clearPermissions(formsModel);
  setForms(lookUpKey, fields, formsModel);
};

const setForms = (lookUpKey, fields, formsModel) => {
  formsModel.update(
    { key: lookUpKey },
    { fields },
    { multi: true, upsert: true },
    (err, user) => {
      if (err) {
        console.error(err);
      }
      console.log("forms set!");
    }
  );
};

const clearForms = formsModel => {
  return formsModel.update({}, { obj: {} }, { multi: true }, (err, user) => {
    if (err) {
      return reject(err);
    }
    console.log("updated!");
  });
};
