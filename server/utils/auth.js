const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const token_secret = process.env.TOKEN_SECRET;

const generateSalt = async () => bcrypt.genSalt(10);

const generateHash = async (password) => {
  const salt = await generateSalt();
  return bcrypt.hash(password, salt);
};

const validatePassword = async (password, savedPassword) =>
  bcrypt.compare(password, savedPassword);

const generateSignature = async (payload) => jwt.sign(payload, token_secret);

const validateSignature = async (token) => jwt.verify(token, token_secret);

module.exports = {
  generateHash,
  validatePassword,
  generateSignature,
  validateSignature,
};
