const express = require("express");

const { getAnswer, postAnswer } = require("../controller/answerController");
// answer route
const router = express.Router();

router.post("/", postAnswer);
router.get("/:questionid", getAnswer);


module.exports = router;
