const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const TOKEN_SECRET = process.env.TOKEN_SECRET || "ABRACADABRA";

const generateSalt = async () => bcrypt.genSalt(10);

const generateHash = async (password) => {
  const salt = await generateSalt();
  return bcrypt.hash(password, salt);
};

const validatePassword = async (password, savedPassword) =>
  bcrypt.compare(password, savedPassword);

const generateSignature = async (payload) => jwt.sign(payload, TOKEN_SECRET);

const authentication = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  token = token.slice(7);

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token", message: err });
    }
    req.user = user;
    next();
  });
};

const currentUserOnly = (req, res, next) => {
  const { user } = req;
  const { id } = req.params;
  console.log("Current user's only", user, id, req.params);
  if (user.id != id) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

const adminOnly = (req, res, next) => {
  const { user } = req;
  if (user.isAdmin) next();
  else res.status(401).json({ message: "Admin only" });
};

module.exports = {
  generateHash,
  validatePassword,
  generateSignature,
  authentication,
  adminOnly,
  currentUserOnly,
};
