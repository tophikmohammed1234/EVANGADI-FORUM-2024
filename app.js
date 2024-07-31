require("dotenv").config();
const express = require("express");
const app = express();
const port = 7700;
const bodyParser = require("body-parser"); //Feven

// dbConnection
const dbConnection = require("./db/dbConfig");

// Middleware to parse JSON bodies

app.use(express.json()); //Feven

app.get("/", (req, res) => {
  res.send("this is a test for evangadi forum");
});

//feven

// Importing route modules
const answerRoutes = require("./routes/answerRoute");
const questionRoutes = require("./routes/questionRoute");
const userRoutes = require("./routes/userRoute");

// Middleware
app.use(bodyParser.json());

// Use routes
app.use("/api/answer", answerRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/users", userRoutes);

async function start() {
  try {
    const result = await dbConnection.execute("SELECT 'test' AS test");
    console.log("Database test result:", result);

    await app.listen(port);
    console.log("Database connection established");
    console.log(`Listening on port ${port}`);
  } catch (error) {
    console.error("Error starting the server:", error.message);
  }
}

start();
//end of feven

// app.listen(port, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(`listening on ${port}`);
//   }
// });
