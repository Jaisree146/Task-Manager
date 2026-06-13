const db = require("../config/db");
async function getAllUsers() {
  const [rows] = await db.query("SELECT * FROM users");

  return rows;
}

async function register(googleId, name, email, roleId) {
  const [result] = await db.query(
    `
            INSERT INTO users
            (
                google_id,
                name,
                email,
                role_id
            )
            VALUES
            (?, ?, ?, ?)
            `,
    [googleId, name, email, roleId],
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
module.exports = {
  getAllUsers,
  register,
  getUserByEmail,
  updateGoogleId,
};
