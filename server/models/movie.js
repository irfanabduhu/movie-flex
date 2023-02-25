const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Movie = sequelize.define(
  "Movie",
  {
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
      allowNull: true,
    },
    posterUrl: {
      type: DataTypes.STRING,
      allowNull: true,
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
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  },
  {
    indexes: [{ name: "title_index", using: "BTREE", fields: ["title"] }],
  }
);

module.exports = Movie;
