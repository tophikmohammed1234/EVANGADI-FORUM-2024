const express = require("express");
const router = express.Router();

const {
  question,
  singleQuestion,
} = require("../controller/questionController");
router.post("/question", question);

// Get single question
router.get("/:question_id", singleQuestion);
module.exports = router;
