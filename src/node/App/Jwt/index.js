import jwtService from "../../services/jwt-service/jwt-service";

const Jwt = ({ app, config, userModel, chatLogModel }) => {
  const onVerify = decodedId => {
    return new Promise((resolve, reject) => {
      userModel.findOne({ _id: decodedId }, (err, user) => {
        if (err) {
          reject(err);
          return console.error(err);
        }
        resolve(user);
        return user;
      });
    });
  };
  const jwtApi = jwtService({ secret: config.get("secret"), onVerify });
  return jwtApi;
};

export default Jwt;
