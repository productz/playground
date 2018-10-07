//the crud service creates [create, read, update, del] endpoints for a mongoose model
import { formsService } from "../../services/forms-service/forms-service.js";
import crudService from "../../services/crud-service/crud-service.js";
import {
  registerAction,
  isPermitted
} from "../../services/acl-service/acl-service";

const Forms = ({ app, config, permissionsModel, formsModel }) => {


  let formsDomainLogic = {
    read: user => {
      return { criteria: {}, isPermitted: true };
    }
  };
  const formsApi = formsService({ Model: formsModel, formsDomainLogic });


  //create a crud here too
  let crudDomainLogic = {
    create: (user, req) => {
      //we need to include is permitted in here
      return {
        isPermitted: isPermitted({ key: "forms_create", user }),
        criteria: {}
      };
    },
    read: (user, req) => {
      return {
        isPermitted: isPermitted({ key: "forms_read", user }),
        criteria: {}
      };
    },
    update: (user, req) => {
      return {
        isPermitted: isPermitted({ key: "forms_update", user }),
        criteria: {}
      };
    },
    del: (user, req) => {
      return {
        isPermitted: isPermitted({ key: "forms_delete", user }),
        criteria: {}
      };
    },
    search: (user, req) => {
      return {
        isPermitted: isPermitted({ key: "forms_search", user }),
        criteria: {}
      };
    }
  };
  const crudApi = crudService({ Model: formsModel, crudDomainLogic });


  registerAction({
    key: "forms",
    domainLogic: crudDomainLogic,
    permissionsModel,
    defaultPermission: false
  });
  return [crudApi, formsApi];
};

export default Forms;
