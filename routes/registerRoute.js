// Importing Modules/Libraries
const express = require("express");
const bcrypt = require("bcryptjs");

// Importing user model
const User = require("../model/User");

// Creating router
const registerRoute = express.Router();

// creating route
registerRoute.get("/", (req, res, next) => {
  res.sendFile("/public/register.html", { root: "./" }, (err) => {
    if (err) {
      next(err);
    } else {
      next();
    }
  });
});

registerRoute.post("/", async (req, res) => {
  // Getting client inputs
  let username = req.body.username;
  let password = req.body.password;
  if (password.length < 5) {
    res.send({
      status: "error",
      message: "password should be more than 5 characters long",
    });
  } else {
    // Hashing password before storing
    password = await bcrypt.hash(req.body.password, 16);

    try {
      // Trying to create new user on database
      await User.create({ username, password });
      res.send({ status: "success", message: "Registration success!" });
    } catch (err) {
      // Catching error during new user creation
      if (err.code == 11000) {
        res.send({ status: "error", message: "User already exist." });
      }
    }
  }
});

// exporting modules
module.exports = registerRoute;
