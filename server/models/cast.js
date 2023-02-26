const { Sequelize, DataTypes } = require("sequelize");
const { sequelize, sequelizeTest } = require("../config/database");

const db = process.env.NODE_ENV === "test" ? sequelizeTest : sequelize;

const Cast = db.define("Cast", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Cast;
