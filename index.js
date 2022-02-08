// Importing Modules/Libraries
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

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
app.use(express.json());

// Setting up Routes
app.get("/", (req, res) => {
  // Taking authorization token header
  const bearer_header = req.header("Authorization");
  if (!bearer_header) {
    // Error if no token has been given
    res.send({ status: "error", message: "no credentials sent!" });
  } else {
    // Splitting token header to extract only token
    const token = bearer_header.split(" ")[1];
    try {
      // verifying token
      jwt.verify(token, SECRET_KEY);
      res.send({ status: "success", message: "Access granted!" });
    } catch (err) {
      // catching error if the token is wrong
      res.send({ status: "error", message: "Invalid Token!" });
    }
  }
});
app.use("/login", loginRoute);
app.use("/register", registerRoute);

// Starting the server
app.listen(PORT, console.log(`Server running on http://localhost:${PORT}`));
