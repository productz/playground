var LocalStrategy = require("passport-local");

export default function local({ passport, onVerify }) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (username, password, cb) => {
      onVerify({ username, password, cb, providerName: "local" });
    })
  );
}
