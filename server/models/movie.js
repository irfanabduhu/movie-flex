const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Movie = sequelize.define("Movie", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  releaseYear: {
    type: DataTypes.INTEGER,
  },
  posterUrl: {
    type: DataTypes.STRING,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  plan: {
    type: DataTypes.ENUM("basic", "premium"),
    allowNull: false,
  },
  rentPeriod: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rentPrice: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Movie;
