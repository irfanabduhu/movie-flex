const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Rent = sequelize.define("Rent", {
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
