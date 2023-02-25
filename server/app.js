const express = require("express");
const sequelize = require("./config/database");
require("./models/association");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/movie", require("./routes/movie"));
app.use("/cast", require("./routes/cast"));
app.use("/fetch", require("./routes/fetch"));

sequelize
  .sync()
  .then(() => {
    app.listen(3333, () => console.log("Listening on http://localhost:3333"));
  })
  .catch((err) =>
    console.error("Sequelize synchronization failed with error: ", err)
  );