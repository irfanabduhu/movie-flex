const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "postgres://johndoe:123456@localhost:5434/movieDB"
);

const sequelizeTest = new Sequelize(
  "postgres://johndoe:123456@localhost:5435/testDB"
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = { sequelize, sequelizeTest };
