const passport = require("passport");

module.exports = app => {
    //creating a route handler for pushing the user for auth process whenever he direct to /auth/google //
    app.get(
        "/auth/google",
        passport.authenticate("google", {
            scope: ["profile", "email"] //we are demanding for user profile and email
        })
    );

    //creating a route handler to take the code coming from google due to above route handler and exchange it for the user details
    app.get("/auth/google/callback", passport.authenticate("google"));

    app.get("/api/current_user", (req, res) => {
        res.send(req.user);
    });

    app.get("/api/logout", (req, res) => {
        req.logout();
        res.send(req.user);
    });
};
