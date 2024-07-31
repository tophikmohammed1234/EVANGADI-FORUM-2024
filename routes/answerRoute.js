const express = require("express");

const router = express.Router();

const { answer } = require("../controller/answerController");

// answer route
router.post("/", answer);

module.exports = router;
