//the crud service creates [create, read, update, delete] endpoints for a mongoose model
import crudService from "../../services/crud-service/crud-service.js";

const User = ({ app, config, userModel }) => {
  const userApi = crudService({ Model: userModel });
  return userApi;
};

export default User;
