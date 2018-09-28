import jwtService from "../../services/jwt-service/jwt-service";

const Jwt = ({ app, config, userModel, chatLogModel }) => {
  const jwtApi = jwtService({ secret: config.get("secret") });
  return jwtApi;
};

export default Jwt;
