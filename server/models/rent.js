const { DataTypes } = require("sequelize");
const { sequelize, sequelizeTest } = require("../config/database");

const db = process.env.NODE_ENV === "test" ? sequelizeTest : sequelize;

const Rent = db.define("Rent", {
  validTill: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  rentPrice: {
    type: DataTypes.DECIMAL(6, 2),
    allowNull: false,
  },
});

module.exports = Rent;
