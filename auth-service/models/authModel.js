const db = require("../config/db");
async function getAllUsers() {
  const [rows] = await db.query("SELECT * FROM users");

  return rows;
}

async function register(googleId, name, email, password) {
  const DEFAULT_ROLE = 2;
  const [result] = await db.query(
    `
    INSERT INTO users
    (
      google_id,
      name,
      email,
      password,
      role_id
    )
    VALUES
    (?, ?, ?, ?, ?)
    `,
    [
      googleId,
      name,
      email,
      password,
      DEFAULT_ROLE,
    ]
  );

  return result;
}

async function getUserByEmail(email) {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
}
async function updateGoogleId(userId, googleId) {
  await db.query(
    `
        UPDATE users
        SET google_id = ?
        WHERE id = ?
        `,
    [googleId, userId],
  );
}

async function storeRefreshToken(userId, token) {
  const [result] = await db.query(
    `INSERT INTO refresh_tokens (user_id, token) VALUES (?, ?)`,
    [userId, token],
  );
  return result;
}

async function getRefreshToken(token) {
  const [rows] = await db.query(
    `SELECT * FROM refresh_tokens WHERE token = ?`,
    [token],
  );
  return rows[0];
}

async function deleteRefreshToken(token) {
  await db.query(`DELETE FROM refresh_tokens WHERE token = ?`, [token]);
}

async function deleteAllUserTokens(userId) {
  await db.query(`DELETE FROM refresh_tokens WHERE user_id = ?`, [userId]);
}

async function getUserById(userId) {
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [userId]);
  return rows[0];
}

module.exports = {
  getAllUsers,
  register,
  getUserByEmail,
  getUserById,
  updateGoogleId,
  storeRefreshToken,
  getRefreshToken,
  deleteRefreshToken,
  deleteAllUserTokens,
};
