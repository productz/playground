//the crud service creates [create, read, update, delete] endpoints for a mongoose model
import crudService from "../../services/crud-service/crud-service.js";

const User = ({ app, config, userModel }) => {
  //you can pass domain logic here that prevents the user from doing something based on some domain logic?
  //we can also include ACL (access control list) as part of that domain logic
  //domain logic will be something like, before you crud run this function and pass the model into
  let domainLogic = {
    c: user => {},
    r: (currentUser) => {
      console.log("current user is",currentUser);
      return true;
    },
    u: () => {},
    d: () => {}
  };
  const userApi = crudService({ Model: userModel, domainLogic });
  return userApi;
};

export default User;
