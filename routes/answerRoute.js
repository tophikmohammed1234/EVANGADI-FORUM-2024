const express = require("express");

// answer route
router.post("/", answer);
const router = express.Router();
const { getAnswer,answer } = require("../controller/answerController");
router.get("/:questionid", getAnswer);


module.exports = router;
