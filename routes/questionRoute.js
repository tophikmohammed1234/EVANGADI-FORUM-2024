const express = require("express");
const router = express.Router();

const { question } = require("../controller/questionController");
router.post("/question", question);

module.exports = router;
