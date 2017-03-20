var GoogleStrategy = require('passport-google-oauth20').Strategy;

export default function google({
    passport,
    User,
    config
}) {
    console.log(config.get('auth.google.CLIENT_ID'));
    passport.use(new GoogleStrategy({
            clientID: config.get('auth.google.CLIENT_ID'),
            clientSecret: config.get('auth.google.CLIENT_SECRET'),
            callbackURL: "https://playground-test-itechdom.c9users.io/auth/google/callback"
        },
        function(accessToken, refreshToken, profile, cb) {
            User.findOrCreate({
                googleId: profile.id
            }, function(err, user) {
                return cb(err, user);
            });
        }
    ));
}

