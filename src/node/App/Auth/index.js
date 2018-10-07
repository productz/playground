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
    if (providerName === "local") {
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
        return cb(null, user);
      });
    }
    //third party providers
    let user = {};

    //keys to be saved
    let providerId = `${providerName}Id`;
    let providerProfile = `${providerName}Profile`;
    let providerAccessToken = `${providerName}AccessToken`;
    let providerRefreshToken = `${providerName}RefreshToken`;

    user.name = profile.displayName;
    user[providerId] = profile.id;
    user[providerAccessToken] = accessToken;
    user[providerRefreshToken] = refreshToken;
    user[providerProfile] = profile;

    let check = {};
    check[providerId] = profile.id;
    userModel.findOrCreate(check, user, function(err, user) {
      return cb(err, user);
    });
  };

  const onRegister = (values, req, res) => {
    let user = new userModel(values);
    let jwtToken = jwt.sign(user, config.get("secret"));
    user.jwtToken = jwtToken;
    //do I generate an auth token?
    //register a user
    userModel.find({ email: user.email }, (err, user) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (user) {
        //found a user
        return res.status(409).send("User already exists");
      }
      return user.save(err => {
        if (err) {
          return res.status(500).send(err);
        }
        return res.send(user);
      });
    });
  };

  const onSuccess = (providerName, user, res) => {
    let jwtToken = jwt.sign(user._id.toString(), config.get("secret"));
    userModel.update(
      { _id: user._id },
      { jwtToken },
      { multi: false },
      (err, user) => {
        if (err) {
          return console.error(err);
        }
      }
    );
    let redirectUrl = `${config.get("redirectUrl")}?jwt=${jwtToken}`;
    if (providerName !== "local") {
      return res.redirect(redirectUrl);
    }
    user["password"] = "";
    return res.status(200).send(user);
  };

  const onLoginFail = (req, res, message) => {
    //in case the auth doesn't works
    res.status(401).send("Login Failed");
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
