//the crud service creates [create, read, update, delete] endpoints for a mongoose model
import crudService from "../../services/crud-service/crud-service.js";
import mediaService from "../../services/media-service/media-service.js";
import vizService from "../../services/viz-service/viz-service.js";

const User = ({ app, config, userModel }) => {
  //you can pass domain logic here that prevents the user from doing something based on some domain logic?
  //we can also include ACL (access control list) as part of that domain logic
  //domain logic will be something like, before you crud run this function and pass the model into
  //in this case we need the acl service to tell use wether this user is allowed or not
  //resource.action is allowed
  let crudDomainLogic = {
    c: (user, req) => {
      return {};
    },
    r: (user, req) => {
      return {};
    },
    u: (user, req) => {
      return {};
    },
    d: (user, req) => {
      return {};
    },
    s: (user, req) => {
      return {};
    }
  };
  const userApi = crudService({ Model: userModel, crudDomainLogic });

  let vizDomainLogic = {
    average: (user, req, res) => {
      //this should return a criteria
      return {};
    },
    min: (user, req, res) => {
      return {};
    },
    max: (user, req, res) => {
      return {};
    },
    sum: (user, req, res) => {
      return {};
    },
    count: (user, req, res) => {
      return {};
    },
    distinct: (user, req, res) => {
      return {};
    }
  };
  const vizApi = vizService({ Model: userModel, domainLogic: vizDomainLogic });

  //file upoad api
  let mediaDomainLogic = {
    c: (user, files) => {
      console.log(files);
    }
  };
  const fileUploadApi = mediaService({ fileName: "avatar", mediaDomainLogic });

  return [userApi, fileUploadApi, vizApi];
};

export default User;
