var LocalStrategy = require("passport-local");

export default function twitter({ passport, onVerify }) {
  passport.use(
    new LocalStrategy((username, password, done) => {
      onVerify({ username, password, done });
    })
  );
}
