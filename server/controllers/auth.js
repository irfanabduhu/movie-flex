const {
  validatePassword,
  generateSignature,
  generateHash,
} = require("../utils/auth");
const User = require("../models/user");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "No such user exists" });

    const validPass = await validatePassword(password, user.password);
    if (!validPass)
      return res.status(401).json({ message: "Credentials do not match" });

    const token = await generateSignature({
      id: user.id,
      isAdmin: user.role === "admin",
    });
    return res.status(200).json({
      user: { name: user.name, plan: user.plan, id: user.id, role: user.role },
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: `An error occurred while logging in user: ${err.message}`,
    });
  }
};

exports.register = async (req, res) => {
  const { name, email, password, plan } = req.body;

  try {
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

    const token = await generateSignature({
      id: user.id,
      isAdmin: user.role === "admin",
    });

    res.status(200).json({
      userId: user.id,
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: `An error occurred while registering a user: ${err.message}`,
    });
  }
};
