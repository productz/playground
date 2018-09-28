// =================================================================
// Setup Auth ========================================
// ================================================================
import passportService from "../../services/passport-service/passport-service.js";
import passport from "passport";
import jwt from "jsonwebtoken";

const Auth = ({ app, config, userModel }) => {
  //on verify, we generate a jwt token (for non-web clients) and then we just store the user
  const onVerify = ({
    accessToken,
    refreshToken,
    profile,
    cb,
    providerName,
    username,
    password
  }) => {
    //add a jwt token for mobile based authentication
    //store the id for providers
    if ((providerName = "local")) {
      return userModel.findOne({ email: username }, function(err, user) {
        if (err) {
          return cb(err);
        }
        if (!user) {
          return cb(null, false);
        }
        if (!user.verifyPassword(password)) {
          return cb(null, false);
        }
        //issue a new jwt token
        let jwtToken = jwt.sign(user, config.get("secret"));
        user.jwtToken = jwtToken;
        return cb(null, user);
      });
    }
    //third party providers
    let providerId = `${providerName}Id`;
    let providerAccessToken = `${providerName}AccessToken`;
    let providerRefreshToken = `${providerName}RefreshToken`;
    let user = {
      name: profile.displayName
    };
    let check = {};
    check[providerId] = profile.id;
    user[providerId] = profile.id;
    user[providerAccessToken] = accessToken;
    user[providerRefreshToken] = refreshToken;
    user.id = profile.id;
    let jwtToken = jwt.sign(user, config.get("secret"));
    user.jwtToken = jwtToken;
    userModel.findOrCreate(check, user, function(err, user) {
      return cb(err, user);
    });
  };

  const onRegister = (values, req, res) => {
    let user = new userModel(values);
    //do I generate an auth token?
    //register a user
    user.save(err => {
      if (err) {
        return res.status(500).send(err);
      }
    });
  };

  const onSuccess = (providerName, user, res) => {
    let redirectUrl = `${config.get("redirectUrl")}?jwt=${user.jwtToken}`;
    if (providerName !== "local") {
      return res.redirect(redirectUrl);
    }
    user["password"] = "";
    return res.status(200).send(user);
  };

  const onLoginFail = (req, res, message) => {
    //in case the auth doesn't works
    res.status(401).send("Error logging in");
  };

  const passportApi = passportService({
    app,
    config,
    passport,
    onVerify,
    onSuccess,
    onLoginFail,
    onRegister
  });

  return passportApi;
};

export default Auth;
