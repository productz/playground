//the crud service creates [create, read, update, del] endpoints for a mongoose model
import { aclService } from "../../services/acl-service/acl-service.js";

const Acl = ({ app, config, permissionsModel }) => {
  const aclApi = aclService({ permissionsModel });
  return [aclApi];
};

export default Acl;
