const User = require("../models/user");

exports.getAll = async (req, res) => {
  try {
    const users = await User.findAll();
    const count = users?.length ?? 0;
    res.status(200);
    res.json({
      users,
      message: `Found ${count} ${count > 1 ? "users" : "user."}`,
    });
  } catch (err) {
    res.status(500);
    res.json({
      message: `An error occurred while fetching all users: ${err.message}`,
    });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404);
      return res.json({ message: `User with id: ${id} cannot be found.` });
    }
    res.status(200);
    res.json({ user, message: "Successfully found the user" });
  } catch (err) {
    res.status(500);
    res.json({
      message: `An error occurred while fetching user with id: ${id}. Error: ${err.message}`,
    });
  }
};

exports.create = async (req, res) => {
  const { name, email, password, plan } = req.body;
  if (!name || !email || !password || !plan) {
    res.status(400);
    return res.json({
      message: "These fields are required: name, email, password, and plan",
    });
  }

  try {
    const user = await User.create({
      name,
      email,
      password,
      plan,
    });
    res.status(201);
    res.json({
      user,
      message: `Successfully created a user.`,
    });
  } catch (err) {
    res.status(500);
    res.json({
      messsage: `An error occurred while creating a user. Error: ${err.message}`,
    });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  if (!body) {
    res.status(400);
    return res.json({ message: "Request body is missing" });
  }

  try {
    const [count, users] = await User.update(body, {
      where: { id },
      returning: true,
    });

    if (count === 0) {
      res.status(404);
      return res.json({
        message: `User with id: '${id}' cannot be found.`,
      });
    }

    res.status(200);
    res.json({
      user: users[0],
      message: "Successfully updated the user.",
    });
  } catch (err) {
    res.status(500);
    res.json({
      message: `An error occurred while updating a user: ${err.message}`,
    });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const count = await User.destroy({ where: { id } });
    if (count === 0) {
      res.status(404);
      res.json({
        message: `User with id: '${id}' cannot be found.`,
      });
    }
    res.status(204);
    res.json({
      message: "Successfully deleted the user.",
    });
  } catch (err) {
    res.status(500);
    res.json({
      message: `An error occurred while deleting a user: ${err.message}`,
    });
  }
};
