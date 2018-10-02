//the crud service creates [create, read, update, delete] endpoints for a mongoose model
import crudService from "../../services/crud-service/crud-service.js";
import mediaService from "../../services/media-service/media-service.js";

const User = ({ app, config, userModel }) => {
  //you can pass domain logic here that prevents the user from doing something based on some domain logic?
  //we can also include ACL (access control list) as part of that domain logic
  //domain logic will be something like, before you crud run this function and pass the model into
  //in this case we need the acl service to tell use wether this user is allowed or not
  //resource.action is allowed
  let crudDomainLogic = {
    c: (user, userData) => {
      //check if this user has acl
      return {
        shallIPass: true,
        criteria: {}
      };
    },
    r: user => {
      return {
        shallIPass: true,
        criteria: {}
      };
    },
    u: (user, userData) => {
      return {
        shallIPass: true,
        criteria: {}
      };
    },
    d: (user, userId) => {
      return {
        shallIPass: true,
        criteria: {}
      };
    },
    s: (user, criteria) => {
      return {
        shallIPass: true,
        criteria: {}
      };
    }
  };
  const userApi = crudService({ Model: userModel, crudDomainLogic });

  //file upoad api
  let mediaDomainLogic = {
    c: (user, files) => {
      console.log(files);
    }
  };
  const fileUploadApi = mediaService({ fileName: "avatar", mediaDomainLogic });

  return [userApi, fileUploadApi];
};

export default User;
