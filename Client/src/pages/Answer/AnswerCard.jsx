import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import classes from "./Answer.module.css";

const AnswerCard = ({ getAnswer }) => {
	const { username, answer } = getAnswer;
	return (
		<>
			<div className={`${classes.answerWrapper} container`}>
				<div className={classes.userProfile}>
					<div>
						<AccountCircleIcon />
					</div>
					<div className={classes.username}>{username}</div>
				</div>

				<div className={classes.answers}>{answer}</div>
			</div>
		</>
	);
};

export default AnswerCard;
