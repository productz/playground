import authApi from "./Auth";
import chatApi from "./Chat";
import userModel from "./MongoDb/models/user";
import chatLogModel from "./MongoDb/models/chat-log";
import houseModel from "./MongoDb/models/house";
import formsModel from "./MongoDb/models/forms";
import permissionsModel from "./MongoDb/models/permissions";
import userApi from "./User";
import houseApi from "./House";
import aclApi from "./Acl";
import formsApi from "./Forms";
import localizationApi from "./Localization";
import jwtApi from "./Jwt";

const Api = ({ app, config }) => {
  let authApiRoutes = authApi({
    app,
    config,
    userModel,
    chatLogModel,
    permissionsModel
  });
  let chatApiRoutes = chatApi({
    app,
    config,
    userModel,
    chatLogModel,
    permissionsModel
  });
  let userApiRoutes = userApi({
    app,
    config,
    userModel,
    chatLogModel,
    permissionsModel,
    formsModel
  });
  let houseApiRoutes = houseApi({
    app,
    config,
    userModel,
    chatLogModel,
    houseModel,
    permissionsModel
  });
  let aclApiRoutes = aclApi({ app, config, permissionsModel });
  let formsApiRoutes = formsApi({ app, config, formsModel, permissionsModel });
  let localizationApiRoutes = localizationApi({ app, userModel });
  let jwtApiRoutes = jwtApi({
    app,
    config,
    userModel,
    chatLogModel,
    permissionsModel
  });
  return {
    authApiRoutes,
    chatApiRoutes,
    userApiRoutes,
    jwtApiRoutes,
    houseApiRoutes,
    localizationApiRoutes,
    aclApiRoutes,
    formsApiRoutes
  };
};

export default Api;
