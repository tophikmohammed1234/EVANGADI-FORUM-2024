const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

// Post answer for questions
async function postAnswer(req, res) {
    const { answer } = req.body;
    const question_id = req.params.question_id;
    const userid = req.user.userid;

    // Validate request body
    if (!answer) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Please provide an answer.",
        });
    }

    try {
        // Insert answer into database
        const [result] = await dbConnection.query(
            "INSERT INTO answerTable (userid, questionid, answer) VALUES (?, ?, ?)",
            [userid, question_id, answer]
        );

        // Check if insertion was successful
        if (result.affectedRows === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Failed to insert answer.",
            });
        }

        // Respond with success message
        return res.status(StatusCodes.CREATED).json({
            message: "Answer posted successfully",
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "An unexpected error occurred.",
        });
    }
}

async function getAnswer(req, res) {
    const question_id = req.params.question_id;

    try {
        const [answers] = await dbConnection.query(
            `SELECT 
                answerTable.answerId, 
                answerTable.answer, 
                userTable.username, 
                questionTable.tag
            FROM 
                answerTable
                JOIN userTable ON answerTable.userid = userTable.userid
                JOIN questionTable ON answerTable.questionid = questionTable.questionid
            WHERE 
                questionTable.questionid = ?
            ORDER BY 
                answerTable.answerId ASC`,
            [question_id]
        );

        // Respond with fetched answers
        return res.status(StatusCodes.OK).json({ answers });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "An unexpected error occurred.",
        });
    }
}

module.exports = { postAnswer, getAnswer };
