const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

// we are making a new instance for authentication with google
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: "/auth/google/callback",
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const existingUser = await User.findOne({
                    googleId: profile.id
                });

                if (existingUser) {
                    // we already have a record in the database
                    done(null, existingUser);
                } else {
                    // we don't have the record in the database
                    const user = await new User({
                        googleId: profile.id
                    }).save();
                    done(null, user);
                }
            } catch (err) {
                console.log("err2");
            }
        }
    )
);
