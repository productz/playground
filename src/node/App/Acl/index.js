//the crud service creates [create, read, update, del] endpoints for a mongoose model
import { aclService } from "../../services/acl-service/acl-service.js";
import crudService from "../../services/crud-service/crud-service.js";
import {
  registerAction,
  isPermitted
} from "../../services/acl-service/acl-service";

const Acl = ({ app, config, permissionsModel }) => {
  const aclApi = aclService({ permissionsModel });
  //create a crud here too
  let crudDomainLogic = {
    create: (user, req) => {
      //we need to include is permitted in here
      return {
        isPermitted: isPermitted({ key: "acl_create", user }),
        criteria: {}
      };
    },
    read: (user, req) => {
      return {
        isPermitted: isPermitted({ key: "acl_read", user }),
        criteria: {}
      };
    },
    update: (user, req) => {
      return {
        isPermitted: isPermitted({ key: "acl_update", user }),
        criteria: {}
      };
    },
    del: (user, req) => {
      return {
        isPermitted: isPermitted({ key: "acl_delete", user }),
        criteria: {}
      };
    },
    search: (user, req) => {
      return {
        isPermitted: isPermitted({ key: "acl_search", user }),
        criteria: {}
      };
    }
  };
  const crudApi = crudService({ Model: permissionsModel, crudDomainLogic });
  registerAction({
    key: "acl",
    domainLogic: crudDomainLogic,
    permissionsModel,
    defaultPermission: false
  });
  return [crudApi, aclApi];
};

export default Acl;
