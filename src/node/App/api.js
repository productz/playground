import authApi from "./Auth";
import chatApi from "./Chat";
import userModel from "./db/models/user";
import chatLogModel from "./db/models/chat-log";
import userApi from "./User";
import jwtApi from "./Jwt";

const Api = ({ app, config }) => {
  let authApiRoutes = authApi({ app, config, userModel, chatLogModel });
  let chatApiRoutes = chatApi({ app, config, userModel, chatLogModel });
  let userApiRoutes = userApi({ app, config, userModel, chatLogModel });
  let jwtApiRoutes = jwtApi({ app, config, userModel, chatLogModel });
  return { authApiRoutes, chatApiRoutes, userApiRoutes, jwtApiRoutes };
};

export default Api;
