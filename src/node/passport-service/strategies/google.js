var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

export default function google({
    passport,
    userService,
    clientId,
    clientSecret,
    callbackURL
}) {
    passport.use(new GoogleStrategy({
            clientID: clientId,
            clientSecret: clientSecret,
            callbackURL
        },
        function(accessToken, refreshToken, profile, cb) {
            userService.findOrCreate({
                googleId: profile.id
            }, function(err, user) {
                return cb(err, user);
            });
        }
    ));
}

