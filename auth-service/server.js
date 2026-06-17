const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const app = express();
app.use(cors());
app.use(express.json());
const passport = require("./config/passport");
app.use(passport.initialize());
const logger = require("./middleware/logger");
app.use(logger);
app.use("/auth", authRoutes);
app.listen(5000, () => {
  console.log("Auth Service Running");
});
