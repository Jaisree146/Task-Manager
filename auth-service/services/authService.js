const jwt = require("jsonwebtoken");
const authModel = require("../models/authModel");
async function getAllUsers() {
  return await authModel.getAllUsers();
}
async function register(googleId, name, email, roleId) {
  return await authModel.register(googleId, name, email, roleId);
}
async function getUserByEmail(email) {
  return await authModel.getUserByEmail(email);
}
async function login(email) {
  const user = await authModel.getUserByEmail(email);

  if (!user) {
    throw new Error("User Not Found");
  }

  // Generate access token (short-lived: 15 minutes)
  const accessToken = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      roleId: user.role_id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    },
  );

  // Generate refresh token (long-lived: 7 days)
  const refreshToken = jwt.sign(
    {
      userId: user.id,
    },
    process.env.REFRESH_SECRET,
    {
      expiresIn: "7d",
    },
  );

  // Store refresh token in database
  await authModel.storeRefreshToken(user.id, refreshToken);

  return {
    accessToken,
    refreshToken,
  };
}

async function refreshAccessToken(refreshToken) {
  if (!refreshToken) {
    throw new Error("Refresh Token Missing");
  }

  try {
    // Verify refresh token signature
    const payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    // Check if token exists in database
    const storedToken = await authModel.getRefreshToken(refreshToken);
    if (!storedToken) {
      throw new Error("Refresh token not found or revoked");
    }

    // Get user details by ID
    const user = await authModel.getUserById(payload.userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Generate new access token
    const accessToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        roleId: user.role_id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      },
    );

    return accessToken;
  } catch (err) {
    throw new Error("Invalid Refresh Token");
  }
}

async function logout(refreshToken) {
  await authModel.deleteRefreshToken(refreshToken);
}

module.exports = {
  getAllUsers,
  register,
  getUserByEmail,
  login,
  refreshAccessToken,
  logout,
};
