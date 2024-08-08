import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../Axios/axiosConfig.js";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./Answer.module.css";
import AnswerCard from "./AnswerCard.jsx";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import LayOut from "../../Component/LayOut/LayOut.jsx";

const Answer = () => {
	const { question_id } = useParams();
	const maxLength = 200;
	const postedanswer = useRef();

	const [question_detail, setQuestionDetail] = useState({});
	const [answers, setAnswers] = useState([]);
	const [isanswered, setAnswer] = useState(false);
	const [charCount, setCharCount] = useState(0);
	const [showCharCount, setShowCharCount] = useState(false);
	const [answerRequired, setanswerRequired] = useState(false);

	// Fetch the question title and description
	async function getQuestionDetail() {
		try {
			const token = localStorage.getItem("token");
			if (!token) throw new Error("No token found");

			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			const res = await axiosInstance.get(`/questions/${question_id}`, config);

			const question = res.data.question[0];
			setQuestionDetail(question);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getQuestionDetail();
	}, [question_id]);

	// Handle changes in the textarea
	const handleTextareaChange = (event) => {
		const currentValue = event.target.value;
		const currentLength = currentValue.length;

		setCharCount(currentLength);
		if (currentLength > 0) {
			setShowCharCount(true);
		} else {
			setShowCharCount(false);
		}
	};

	const handleTextareaFocus = () => {
		setShowCharCount(true);
	};

	const handleTextareaBlur = () => {
		if (charCount === 0) {
			setShowCharCount(false);
		}
	};

	// Fetch answers for the specific question
	async function getAnswers() {
		try {
			const token = localStorage.getItem("token");
			if (!token) throw new Error("No token found");

			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			const res = await axiosInstance.get(`/answers/${question_id}`, config);

			setAnswers(res.data.answers);
		} catch (error) {
			console.log(error.response);
		}
	}

	// Post an answer
	async function postAnswer(e) {
		e.preventDefault();

		const Answer = postedanswer.current.value;

		let hasError = false;
		if (!Answer) {
			setanswerRequired(true);
			hasError = true;
		} else {
			setanswerRequired(false);
		}
		if (hasError) {
			return;
		}

		try {
			const token = localStorage.getItem("token");
			if (!token) throw new Error("No token found");

			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			await axiosInstance.post(
				`/answers/${question_id}`,
				{
					questionid: question_id,
					answer: Answer,
				},
				config
			);

			postedanswer.current.value = "";
			setCharCount(0);
			getAnswers();
			setAnswer(true);

			// Set a timer to remove the Answer posted successfully  message after 3 seconds
			const timeoutId = setTimeout(() => {
				setAnswer(false);
			}, 3000);
			return () => clearTimeout(timeoutId);
		} catch (error) {
			alert("Something went wrong");
			console.log(error.response);
		}
	}

	useEffect(() => {
		getAnswers();
	}, [question_id]);

	// Destructure question_detail values
	const { title, description } = question_detail;

	return (
		<LayOut>
			<section className={`${classes.outer_wrapper} container`}>
				{/* =============QUESTION DETAIL SECTION============== */}
				<section className={`${classes.question_detail_wrapper}`}>
					{question_detail && (
						<>
							<h2>Question</h2>
							<br />
							<div className={classes.question_title}>
								<span>
									<ArrowCircleRightIcon />
								</span>
								<div className={classes.title}>
									<h2>{title}</h2>
								</div>
							</div>
							<div className={`${classes.bottom_border}`}></div>
							<div>
								<h6 className={`${classes.description} mb-5 pb-3`}>
									{description}
								</h6>
							</div>
						</>
					)}
					<div></div>
					<hr />
					<h3 className="my-4">Answer From The Community</h3>
					<hr className="mb-4" />
				</section>

				{/* =============GET ANSWER SECTION============== */}
				<section>
					<section className={`${classes.answer_wrapper}`}>
						{answers.length > 0 ? (
							answers.map((getAnswer, i) => (
								<AnswerCard key={i} getAnswer={getAnswer} />
							))
						) : (
							<p>No answers yet.</p>
						)}
					</section>
				</section>

				{/* ============POST ANSWER SECTION============== */}
				<section className={`${classes.post_answer_wrapper}`}>
					<form onSubmit={postAnswer}>
						{isanswered && (
							<h5 className={classes.alert_msg}>Answer posted successfully</h5>
						)}

						<textarea
							ref={postedanswer}
							maxLength={maxLength}
							onChange={handleTextareaChange}
							onFocus={handleTextareaFocus}
							onBlur={handleTextareaBlur}
							name="postedanswer"
							id="postedanswer"
							placeholder="Your answer ..."
							className={`${
								answerRequired ? classes.answer_filed_error : ""
							}  w-100 mt-4 p-3`}
						></textarea>
						{answerRequired && (
							<p className={`text-danger `}>Answer is required</p>
						)}
						{showCharCount && (
							<small className={`${classes.characterCount} my-3`}>
								{charCount}/200
							</small>
						)}
						<br />
						<button type="submit" className={`${classes.button} mb-5`}>
							Post Answer
						</button>
					</form>
				</section>
			</section>
		</LayOut>
	);
};

export default Answer;
