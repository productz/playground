//the crud service creates [create, read, update, delete] endpoints for a mongoose model
import { aclService } from "../../services/acl-service/acl-service.js";

const Acl = ({ app, config, userModel, houseModel }) => {
  const aclApi = aclService({ userModel });
  return [aclApi];
};

export default Acl;
