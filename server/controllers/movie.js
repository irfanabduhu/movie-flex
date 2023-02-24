const sequelize = require("../config/database");

const Movie = sequelize.models["Movie"];
const Movie_Cast = sequelize.models["Movie_Cast"];

exports.getAll = async (req, res) => {
  res.send("not implemented\n");
};

exports.getById = async (req, res) => {
  res.send("not implemented\n");
};

exports.create = async (req, res) => {
  res.send("not implemented\n");
};
exports.update = async (req, res) => {
  res.send("not implemented\n");
};
exports.delete = async (req, res) => {
  res.send("not implemented");
};
