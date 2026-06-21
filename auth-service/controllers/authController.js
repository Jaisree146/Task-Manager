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
    const { googleId, name, email, password } = req.body;

    const result = await authService.register(
      googleId,
      name,
      email,
      password
    );

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

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const tokens = await authService.login(email, password);
    res.json({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
}

async function refreshToken(req, res) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh Token Missing",
      });
    }

    const accessToken = await authService.refreshAccessToken(refreshToken);
    res.json({
      accessToken,
    });
  } catch (err) {
    res.status(403).json({
      message: "Invalid Refresh Token",
    });
  }
}

async function logout(req, res) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh Token Missing",
      });
    }

    await authService.logout(refreshToken);
    res.json({
      message: "Logged out successfully",
    });
  } catch (err) {
    res.status(500).json({
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
  refreshToken,
  logout,
  getProfile,
};
