require("dotenv").config();
const express = require("express");
const app = express();
const port = 7700;

// dbConnection\
const dbConnection = require("./db/dbConfig");
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
