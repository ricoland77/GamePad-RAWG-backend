const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: String,
  email: String,
  favorites: { type: Array, default: [] },
  token: String,
  salt: String,
  hash: String,
});

module.exports = User;
