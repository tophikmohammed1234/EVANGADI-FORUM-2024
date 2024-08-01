const {singleQuestion} =require('../controller/questionController')


// Get single question
router.get("/:question_id", singleQuestion);
