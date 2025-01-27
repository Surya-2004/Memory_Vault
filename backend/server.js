require("dotenv").config(); // Load environment variables
const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");
const session = require("express-session");
const app = express();

// Middleware
app.use(express.json());

// Session configuration
if (!process.env.SESSION_SECRET) {
  console.error("Error: SESSION_SECRET is not set in the environment variables!");
  process.exit(1);
}

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" }
  })
);

// Import routes
const capsulesRouter = require("./routes/capsules");

// Use the capsules router for /users/capsules
app.use("/users/capsules", capsulesRouter);

// Start the server
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
