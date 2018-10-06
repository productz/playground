//the crud service creates [create, read, update, delete] endpoints for a mongoose model
import crudService from "../../services/crud-service/crud-service.js";
import mediaService from "../../services/media-service/media-service.js";
import vizService from "../../services/viz-service/viz-service.js";
import {
  registerAction,
  isPermitted
} from "../../services/acl-service/acl-service";

const User = ({ app, config, userModel }) => {
  let crudDomainLogic = {
    create: (user, req) => {
      //we need to include is permitted in here
      return {
        isPermitted: isPermitted({ key: "user.create", user }),
        criteria: {}
      };
    },
    read: (user, req) => {
      return {
        isPermitted: isPermitted({ key: "user.read", user }),
        criteria: {}
      };
    },
    update: (user, req) => {
      return {
        isPermitted: isPermitted({ key: "user.update", user }),
        criteria: {}
      };
    },
    delete: (user, req) => {
      return {
        isPermitted: isPermitted({ key: "user.delete", user }),
        criteria: {}
      };
    },
    search: (user, req) => {
      return {
        isPermitted: isPermitted({ key: "user.search", user }),
        criteria: {}
      };
    }
  };
  registerAction({ key: "user", domainLogic: crudDomainLogic, userModel });
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
    saveMedia: (user, files) => {}
  };
  registerAction({ key: "user", domainLogic: mediaDomainLogic, userModel });

  const fileUploadApi = mediaService({ fileName: "avatar", mediaDomainLogic });

  return [userApi, fileUploadApi, vizApi];
};

export default User;
