const express = require("express");
const router = express.Router();

const {
	question,
	singleQuestion,
	getQuestions,
} = require("../controller/questionController");
router.post("/question", question);
router.get("/all", getQuestions);

// Get single question
router.get("/:question_id", singleQuestion);
module.exports = router;
