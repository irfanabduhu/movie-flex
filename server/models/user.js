const { Sequelize, DataTypes } = require("sequelize");
const { sequelize, sequelizeTest } = require("../config/database");
const { generateHash } = require("../utils/auth");

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
  role: {
    type: DataTypes.ENUM("admin", "user"),
    defaultValue: "user",
  },
  plan: {
    type: DataTypes.ENUM("basic", "premium"),
    defaultValue: "basic",
  },
});

(async () => {
  hashedPassword = await generateHash("abracadabra");
  await User.create({
    name: "admin",
    email: "admin@example.com",
    password: hashedPassword,
    role: "admin",
  }).catch(() => console.log("Only for seeding admin account."));
})();

module.exports = User;
