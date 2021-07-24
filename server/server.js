const express = require("express");
const connect = require("./config/db");
const userController = require("./controllers/user.controller");
const flatController = require("./controllers/flat.controller");
const residentController = require("./controllers/resident.controller");
const passport = require("./config/passport");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.use(cors());

passport.serializeUser(function (user, done) {
  done(null, user);
  // where is this user.id going? Are we supposed to access this anywhere?
});

// used to deserialize the user
passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/signin" }),
  function (req, res) {
    console.log("User", req.user);

    res
      .status(200)
      .json({ status: "success", user: req.user.user, token: req.user.token });
  }
);

app.use("/users", userController);
app.use("/flats", flatController);
app.use("/residents", residentController);

const start = () => {
  console.log("Connecting to db");
  connect().then(() => {
    app.listen(5000, () => {
      console.log("Server running");
    });
  });
};

module.exports = start;
