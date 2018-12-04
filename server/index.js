const express = require("express");
require("./services/passport"); //Since We only want it to execute once

const app = express();

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
