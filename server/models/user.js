const { Sequelize, DataTypes } = require("sequelize");
const { sequelize, sequelizeTest } = require("../config/database");

const db = process.env.NODE_ENV === "test" ? sequelizeTest : sequelize;

const User = db.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  plan: {
    type: DataTypes.ENUM("basic", "premium"),
    allowNull: false,
  },
});

module.exports = User;
