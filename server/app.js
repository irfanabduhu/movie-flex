const express = require("express");
const sequelize = require("./config/database");

const app = express();

app.get("/", (req, res) =>
  res.json({
    status: "OK",
    message: "Hello World",
  })
);

app.listen(3333, () => console.log("Listening on http://localhost:3333"));
