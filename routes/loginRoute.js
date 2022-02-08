// Importing Modules/Libraries
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Configuring SECRET_KEY
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

// Importing user model
const User = require("../model/User");

// Creating router
const loginRoute = express.Router();

// creating route
loginRoute.post("/", async (req, res) => {
  // Getting client inputs
  const username = req.body.username;
  const password = req.body.password;

  // Searching user from database
  const user = await User.find({ username: username })
    .exec()
    .then((data) => {
      return data[0];
    });

  // Checking if the user exist or not
  if (user) {
    // Matching the username and password
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ username, password }, SECRET_KEY);

      res.send({ status: "success", message: "Logged In!", token: token });
    } else {
      // Sending error if username and password did not match
      res.send({
        status: "error",
        message: "username and password did not match.",
      });
    }
  } else {
    // Sending error if username was not found
    res.send({
      status: "error",
      message: "username does not exist!",
    });
  }
});

// exporting modules
module.exports = loginRoute;
