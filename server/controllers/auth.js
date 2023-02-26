const {
  validatePassword,
  generateSignature,
  generateHash,
} = require("../utils/auth");
const User = require("../models/user");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(404).json({ message: "No such user exists" });

  const validPass = await validatePassword(password, user.password);
  if (!validPass)
    return res.status(401).json({ message: "Credentials do not match" });

  const token = await generateSignature({ id: user.id });

  return res.status(200).json({ token, message: "Successfully logged in" });
};

exports.register = async (req, res) => {
  const { name, email, password, plan } = req.body;

  const emailExist = await User.findOne({ where: { email } });
  if (emailExist)
    return res.status(409).json({ message: "User already exists" });

  const hashedPassword = await generateHash(password);

  const user = await User.create({
    name,
    email,
    plan,
    password: hashedPassword,
  });

  if (!user)
    return res.status(400).json({ message: "Could not save the user" });

  const token = await generateSignature({ id: user.id });

  return res.status(200).json({ token, message: "Successfully registered" });
};
