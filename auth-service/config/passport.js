const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const authModel = require("../models/authModel");
require("dotenv").config();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("OAuth callback reached");
        const email = profile.emails[0].value;
        console.log("Email:", email);
        const user = await authModel.getUserByEmail(email);
        if (user && user.google_id === null) {
          await authModel.updateGoogleId(user.id, profile.id);
          user.google_id = profile.id;
        }
        console.log("User:", user);
        if (!user) {
          return done(null, {
            newUser: true,
            email: profile.emails[0].value,
            name: profile.displayName,
            googleId: profile.id,
          });
        }

        console.log("User found");

        const token = jwt.sign(
          {
            userId: user.id,
            email: user.email,
            roleId: user.role_id,
          },
          process.env.JWT_SECRET,
        );
        console.log("JWT created");

        return done(null, { user, token });
      } catch (err) {
        console.log("ERROR:", err);
        return done(err, null);
      }
    },
  ),
);

module.exports = passport;
