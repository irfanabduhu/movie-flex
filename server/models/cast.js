const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Cast = sequelize.define("Cast", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Cast;
