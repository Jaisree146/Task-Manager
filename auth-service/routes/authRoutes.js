const express = require("express");
const router = express.Router();
const {
  getUsers,
  register,
  getUserByEmail,
  login,
  refreshToken,
  logout,
  getProfile,
} = require("../controllers/authController");
const authenticateToken = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const passport = require("passport");

router.post("/register", register);
router.post("/login", login);
router.get("/users", authenticateToken, roleMiddleware(1), getUsers);
router.get("/users/:email", getUserByEmail);
router.get("/profile", authenticateToken, getProfile);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  (req, res) => {
    if (req.user.newUser) {
      return res.json({
        message: "User does not exist",
        email: req.user.email,
        name: req.user.name,
        googleId: req.user.googleId,
      });
    }

    res.json({
      accessToken: req.user.accessToken,
      refreshToken: req.user.refreshToken,
    });
  },
);
router.post("/refresh", refreshToken);
router.post("/logout", logout);

module.exports = router;
