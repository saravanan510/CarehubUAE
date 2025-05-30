const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  userName: String,
  password: String,
});

const User = model("user", userSchema);

module.exports = User;
