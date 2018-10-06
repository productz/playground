import authApi from "./Auth";
import chatApi from "./Chat";
import userModel from "./MongoDb/models/user";
import chatLogModel from "./MongoDb/models/chat-log";
import houseModel from "./MongoDb/models/house";
import userApi from "./User";
import houseApi from "./House";
import aclApi from "./Acl";
import localizationApi from "./Localization";
import jwtApi from "./Jwt";

const Api = ({ app, config }) => {
  let authApiRoutes = authApi({ app, config, userModel, chatLogModel });
  let chatApiRoutes = chatApi({ app, config, userModel, chatLogModel });
  let userApiRoutes = userApi({ app, config, userModel, chatLogModel });
  let houseApiRoutes = houseApi({
    app,
    config,
    userModel,
    chatLogModel,
    houseModel
  });
  let aclApiRoutes = aclApi({ app, config, userModel });
  let localizationApiRoutes = localizationApi({ app, userModel });
  let jwtApiRoutes = jwtApi({ app, config, userModel, chatLogModel });
  return {
    authApiRoutes,
    chatApiRoutes,
    userApiRoutes,
    jwtApiRoutes,
    houseApiRoutes,
    localizationApiRoutes,
    aclApiRoutes
  };
};

export default Api;
