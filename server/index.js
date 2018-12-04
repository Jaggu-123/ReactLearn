const express = require("express");
const mongoose = require("mongoose");

const keys = require("./config/keys");
require("./model/User");
require("./services/passport"); //Since We only want it to execute once

mongoose.connect(keys.mongoURI);
const app = express();

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
