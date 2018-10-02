import authApi from "./Auth";
import chatApi from "./Chat";
import userModel from "./MongoDb/models/user";
import chatLogModel from "./MongoDb/models/chat-log";
import houseModel from "./MongoDb/models/house";
import userApi from "./User";
import houseApi from "./House";
import jwtApi from "./Jwt";

const Api = ({ app, config }) => {
  let authApiRoutes = authApi({ app, config, userModel, chatLogModel });
  let chatApiRoutes = chatApi({ app, config, userModel, chatLogModel });
  let userApiRoutes = userApi({ app, config, userModel, chatLogModel });
  let houseApiRoutes = houseApi({ app, config, userModel, chatLogModel, houseModel });
  let jwtApiRoutes = jwtApi({ app, config, userModel, chatLogModel });
  return { authApiRoutes, chatApiRoutes, userApiRoutes, jwtApiRoutes, houseApiRoutes };
};

export default Api;
