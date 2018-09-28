var FacebookStrategy = require("passport-facebook");

export default function twitter({
  passport,
  clientId,
  clientSecret,
  callbackURL,
  onVerify
}) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: clientId,
        clientSecret: clientSecret,
        callbackURL
      },
      function(accessToken, refreshToken, profile, cb) {
        let providerName = "facebook";
        onVerify({ accessToken, refreshToken, profile, cb, providerName });
      }
    )
  );
}
