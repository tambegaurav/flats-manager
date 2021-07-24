const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  bcrypt.hash(this.password, 8, (err, hash) => {
    // Store hash in your password DB.
    if (err) return next(err);

    console.log(hash);
    this.password = hash;
    next();
  });
});

userSchema.methods.checkPassword = function (password) {
  const hashedPassword = this.password;

  return new Promise(function (resolve, reject) {
    bcrypt.compare(password, hashedPassword, (err, same) => {
      if (err) return reject(err);

      resolve(same);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
