const express = require("express");

const { getAnswer, postAnswer } = require("../controller/answerController");
// answer route
const router = express.Router();

router.post("/:question_id", postAnswer);
router.get("/:question_id", getAnswer);

module.exports = router;
