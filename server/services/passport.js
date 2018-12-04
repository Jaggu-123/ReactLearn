const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");

const keys = require("../config/keys");

// we are making a new instance for authentication with google
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: "/auth/google/callback"
        },
        (accessToken, refreshToken, profile, done) => {
            console.log(accessToken);
            console.log(refreshToken);
        }
    )
);
