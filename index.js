// Importing Modules/Libraries
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

// Importing routes
const loginRoute = require("./routes/loginRoute");
const registerRoute = require("./routes/registerRoute");

// Configuring environment variables
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const SECRET_KEY = process.env.SECRET_KEY;

// Connecting mongodb to the server
mongoose.connect(MONGO_URI, console.log("Database connection established!"));

// Instantiating express application
const app = express();

// Adding Middlewares
app.use(cookieParser());
app.use(express.json());

// Setting up Routes
app.get("/", (req, res, next) => {
  // Taking cookie token
  const token = req.cookies.token;
  if (!token) {
    // redirecting if no token has been given
    res.redirect("/login");
  } else {
    try {
      // verifying token
      jwt.verify(token, SECRET_KEY);
      // Sending index file after successfully getting the token
      res.sendFile("/public/index.html", { root: "./" }, (err) => {
        if (err) {
          next(err);
        } else {
          next();
        }
      });
    } catch (err) {
      // catching error and redirecting if the token is wrong
      res.redirect("/login");
    }
  }
});
app.use("/login", loginRoute);
app.use("/register", registerRoute);

// Starting the server
app.listen(PORT, console.log(`Server running on http://localhost:${PORT}`));
