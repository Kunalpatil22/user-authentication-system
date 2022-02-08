// Importing mongoose library
const mongoose = require("mongoose");

// Creating user schema
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, min: 5 },
    password: { type: String, required: true, min: 5 },
  },
  { collection: "users" }
);

// Creating user model
const User = mongoose.model("User", UserSchema);

// Exporting user model
module.exports = User;
