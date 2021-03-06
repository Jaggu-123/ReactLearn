const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");

const keys = require("./config/keys");
require("./model/User");
require("./model/Survey");
require("./services/passport"); //Since We only want it to execute once

mongoose.connect(keys.mongoURI);
const app = express();

app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

if (process.env.NODE_ENV === "production") {
    // Express will serve up the production assets
    // like our main.js or main.css file
    app.use(express.static("client/build"));

    // Express will serve up the index.html assets
    // if it does not recognize the route
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
