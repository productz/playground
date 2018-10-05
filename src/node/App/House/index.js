//the crud service creates [create, read, update, delete] endpoints for a mongoose model
import crudService from "../../services/crud-service/crud-service.js";
import mediaService from "../../services/media-service/media-service.js";
import vizService from "../../services/viz-service/viz-service.js";
import { parseNumberQuery } from "../../services/utils/utils";

const House = ({ app, config, userModel, houseModel }) => {
  //you can pass domain logic here that prevents the user from doing something based on some domain logic?
  //we can also include ACL (access control list) as part of that domain logic
  //domain logic will be something like, before you crud run this function and pass the model into
  //in this case we need the acl service to tell use wether this user is allowed or not
  //resource.action is allowed
  let crudDomainLogic = {
    c: (user, req, res) => {
      return {};
    },
    r: (user, req, res) => {
      return {};
    },
    u: (user, req, res) => {
      return {};
    },
    d: (user, req, res) => {
      return {};
    },
    s: (user, req, res) => {
      return {};
    }
  };

  const houseApi = crudService({ Model: houseModel, crudDomainLogic });

  let vizDomainLogic = {
    average: (user, req, res) => {
      //this should return a criteria
      return req.query;
    },
    min: (user, req, res) => {
      return req.query;
    },
    max: (user, req, res) => {
      return req.query;
    },
    sum: (user, req, res) => {
      //query, this is a type
      console.log(parseNumberQuery(req.query));
      return req.query;
    },
    count: (user, req, res) => {
      return req.query;
    },
    distinct: (user, req, res) => {
      return req.query;
    }
  };
  const vizApi = vizService({ Model: houseModel, domainLogic: vizDomainLogic });

  //file upoad api
  let mediaDomainLogic = {
    c: (user, files) => {
      console.log(files);
    }
  };
  const fileUploadApi = mediaService({ fileName: "house", mediaDomainLogic });

  return [houseApi, fileUploadApi, vizApi];
};

export default House;
