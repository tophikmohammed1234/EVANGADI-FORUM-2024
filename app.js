require("dotenv").config();
const express = require("express");
const app = express();
const port = 7700;

// dbConnection\
const dbConnection = require("./db/dbConfig");

// User routes middleware file
const userRoutes = require("./routes/userRoutes");
// questions routes middleware file

// answers routes middleware file

app.use(express.json());

// User routes middleware
app.use("/api/users", userRoutes);

// questions routes middleware
app.use("/api/questions", userRoutes);
// answers routes middleware

app.get("/", (req, res) => {
  res.send("this is a test for evangadi forum");
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`listening on ${port}`);
  }
});
