const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
require("./models/association");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/user"));
app.use("/movie", require("./routes/movie"));
app.use("/cast", require("./routes/cast"));
app.use("/fetch", require("./routes/fetch"));
app.use("/catalogue", require("./routes/catalogue"));

sequelize
  .sync()
  .then(() => {
    app.listen(3333, () => console.log("Listening on http://localhost:3333"));
  })
  .catch((err) =>
    console.error("Sequelize synchronization failed with error: ", err)
  );
