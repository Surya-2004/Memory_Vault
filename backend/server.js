require("dotenv").config(); 
const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");
const session = require("express-session");
const app = express();


app.use(express.json());


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


const capsulesRouter = require("./routes/capsules");


app.use("/users/capsules", capsulesRouter);


app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
