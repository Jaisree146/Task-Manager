const authService = require("../services/authService");
async function getUsers(req, res) {
  try {
    const users = await authService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}
async function register(req, res) {
  try {
    const { googleId, name, email, roleId } = req.body;

    const result = await authService.register(googleId, name, email, roleId);

    res.status(201).json({
      message: "User Created",
      id: result.insertId,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}
async function getUserByEmail(req, res) {
  try {
    const { email } = req.params;
    const user = await authService.getUserByEmail(email);
    if (user.length === 0) {
      res.status(404).json({
        error: "User not found",
      });
    } else {
      res.json(user[0]);
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}
async function login(req, res) {
  try {
    const { email } = req.body;
    const token = await authService.login(email);
    res.json({
      token,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
}
async function getProfile(req, res) {
  try {
    const user = req.user;
    res.json({
      userId: user.userId,
      email: user.email,
      roleId: user.roleId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
module.exports = {
  getUsers,
  register,
  getUserByEmail,
  login,
  getProfile,
};
