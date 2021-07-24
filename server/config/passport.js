const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../models/user.model");
const { v4: uuid } = require("uuid");

const jwt = require("jsonwebtoken");

const newToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
};

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "964880322234-rqaj97hjfhumcq6u5sir42dna13noscb.apps.googleusercontent.com",
      clientSecret: "oc03YmW4-Wmm7pTpLN6hgDzX",
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      //   console.log(profile);
      const email = profile._json.email;
      console.log(email);

      let user = await User.findOne({ email: email });

      if (!user) {
        user = await User.create({
          firstName: profile._json.given_name,
          lastName: profile._json.family_name,
          email: email,
          password: uuid(),
        });
      }

      console.log(user);

      const token = newToken(user);

      const data = { user, token };

      return done(null, data);
    }
  )
);

module.exports = passport;
