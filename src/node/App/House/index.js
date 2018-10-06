//the crud service creates [create, read, update, delete] endpoints for a mongoose model
import crudService from "../../services/crud-service/crud-service.js";
import mediaService from "../../services/media-service/media-service.js";
import vizService from "../../services/viz-service/viz-service.js";
import { parseNumberQuery } from "../../services/utils/utils";
import {
  registerAction,
  isPermitted
} from "../../services/acl-service/acl-service";

const House = ({ app, config, userModel, houseModel, permissionsModel }) => {

  let crudDomainLogic = {
    create: (user, req) => {
      //we need to include is permitted in here
      return {
        isPermitted: isPermitted({ key: "house_create", user }),
        criteria: {}
      };
    },
    read: (user, req) => {
      return {
        isPermitted: isPermitted({ key: "house_read", user }),
        criteria: {}
      };
    },
    update: (user, req) => {
      return {
        isPermitted: isPermitted({ key: "house_update", user }),
        criteria: {}
      };
    },
    delete: (user, req) => {
      return {
        isPermitted: isPermitted({ key: "house_delete", user }),
        criteria: {}
      };
    },
    search: (user, req) => {
      return {
        isPermitted: isPermitted({ key: "house_search", user }),
        criteria: {}
      };
    }
  };

  const houseApi = crudService({ Model: houseModel, crudDomainLogic });

  let vizDomainLogic = {
    average: (user, req, res) => {
      return parseNumberQuery(req.query);
    },
    min: (user, req, res) => {
      return parseNumberQuery(req.query);
    },
    max: (user, req, res) => {
      return parseNumberQuery(req.query);
    },
    sum: (user, req, res) => {
      return parseNumberQuery(req.query);
    },
    count: (user, req, res) => {
      return parseNumberQuery(req.query);
    },
    distinct: (user, req, res) => {
      return parseNumberQuery(req.query);
    }
  };
  const vizApi = vizService({ Model: houseModel, domainLogic: vizDomainLogic });

  //file upoad api
  let mediaDomainLogic = {
    saveMedia: (user, files) => {
      console.log(files);
    }
  };
  const fileUploadApi = mediaService({ fileName: "house", mediaDomainLogic });

  //register actions to configure acls
  registerAction({
    key: "house",
    domainLogic: crudDomainLogic,
    permissionsModel,
    defaultPermission: false
  });
  registerAction({
    key: "house",
    domainLogic: mediaDomainLogic,
    permissionsModel
  });

  return [houseApi, fileUploadApi, vizApi];
};

export default House;
