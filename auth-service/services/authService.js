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
console.log(user);
  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      roleId: user.role_id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );

  return token;
}
module.exports = {
  getAllUsers,
  register,
  getUserByEmail,
  login,
};
