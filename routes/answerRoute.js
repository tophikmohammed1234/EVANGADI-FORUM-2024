const express = require("express");

const router = express.Router();

const { answer } = require("../controller/answerController");

// answer route
router.post("/", answer);
const router = express.Router();
const { getAnswer } = require("../controller/answerController");
router.get("/:questionid", getAnswer);


module.exports = router;
