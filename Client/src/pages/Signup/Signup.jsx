import { useRef, useState } from "react";
import styles from "./Signup.module.css";
import axios from "../../Axios/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Signup() {
	const navigate = useNavigate();
	const userNameDom = useRef();
	const firstNameDom = useRef();
	const lastNameDom = useRef();
	const emailDom = useRef();
	const passwordDom = useRef();
	const [showPassword, setShowPassword] = useState(false);
	const [formErrors, setFormErrors] = useState({});

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	async function handleSubmit(e) {
		e.preventDefault();
		const userNameValue = userNameDom.current.value;
		const firstNameValue = firstNameDom.current.value;
		const lastNameValue = lastNameDom.current.value;
		const emailValue = emailDom.current.value;
		const passwordValue = passwordDom.current.value;

		if (
			!userNameValue ||
			!firstNameValue ||
			!lastNameValue ||
			!emailValue ||
			!passwordValue
		) {
			alert("Please fill all the fields");
			return;
		}

		try {
			await axios.post("/users/register", {
				username: userNameValue,
				firstname: firstNameValue,
				lastname: lastNameValue,
				email: emailValue,
				password: passwordValue,
			});
			navigate("/login");
		} catch (error) {
			alert("Something went wrong");
			console.log(error.response);
		}
	}

	return (
		<>
			<Header />
			<section className={styles.allSection}>
				<div className={styles.entirePageHolder}>
					<div className={styles.entirePagePad}>
						<div className={styles.signupPageContainer}>
							<div className={styles.signupHeading}>
								<h3 className={styles.signupTitle}>Join the network</h3>
								<p>
									Already have an account?
									<Link className={styles.textLinks} to="/login">
										Sign in
									</Link>
								</p>
							</div>

							<form
								name="signupForm"
								className={styles.signupForm}
								onSubmit={handleSubmit}
							>
								<input
									ref={userNameDom}
									type="text"
									className={`${styles.formInput} ${
										formErrors.username ? styles.error : ""
									}`}
									name="username"
									placeholder="User Name"
								/>
								{formErrors.username && (
									<span className={styles.errorMessage}>
										{formErrors.username}
									</span>
								)}

								<input
									ref={emailDom}
									type="email"
									className={`${styles.formInput} ${
										formErrors.email ? styles.error : ""
									}`}
									name="email"
									placeholder="Email"
								/>
								{formErrors.email && (
									<span className={styles.errorMessage}>
										{formErrors.email}
									</span>
								)}

								<div className={styles.row}>
									<div className={styles.Name}>
										<input
											ref={firstNameDom}
											type="text"
											className={`${styles.formInput} ${
												formErrors.firstName ? styles.error : ""
											}`}
											name="firstName"
											placeholder="First Name"
										/>
										{formErrors.firstName && (
											<span className={styles.errorMessage}>
												{formErrors.firstName}
											</span>
										)}
									</div>
									<div className={styles.Name}>
										<input
											ref={lastNameDom}
											type="text"
											className={`${styles.formInput} ${
												formErrors.lastName ? styles.error : ""
											}`}
											name="lastName"
											placeholder="Last Name"
										/>
										{formErrors.lastName && (
											<span className={styles.errorMessage}>
												{formErrors.lastName}
											</span>
										)}
									</div>
								</div>

								<div className={styles.pwdMask}>
									<input
										ref={passwordDom}
										type={showPassword ? "text" : "password"}
										className={`${styles.formInput} ${
											formErrors.password ? styles.error : ""
										}`}
										name="password"
										placeholder="Password"
									/>
									<span
										className={`${styles.fa} ${
											showPassword ? styles.faEye : styles.faEyeSlash
										}`}
										onClick={togglePasswordVisibility}
									></span>
									{formErrors.password && (
										<span className={styles.errorMessage}>
											{formErrors.password}
										</span>
									)}
								</div>

								<button className={styles.signupBtn} type="submit">
									Agree & Join
								</button>
							</form>

							<div className={styles.Text}>
								By joining, you agree to the
								<Link className={styles.linksSinup} to="/terms">
									Terms of Service
								</Link>
								and
								<Link className={styles.linksSinup} to="/privacy-policy">
									Privacy Policy
								</Link>
								.
								<br />
								<Link className={styles.linksSinup} to="/login">
									Already have an account?
								</Link>
							</div>
						</div>

						<div className={styles.description}>
							<div className={styles.descriptionTitle}>
								<Link className={styles.About} to="/About">
									About
								</Link>
								<h2>Evangadi Networks!</h2>
							</div>

							<div className={styles.descriptionText}>
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Voluptates culpa, reiciendis autem earum eum corrupti deleniti
									iusto fugiat corporis qui dolorum, reprehenderit suscipit
									molestiae quidem. Facere neque deleniti doloremque ipsum.
								</p>
								<p>
									Lorem ipsum, dolor sit amet consectetur adipisicing elit.
									Provident, minus corporis aut tempora laudantium natus modi id
									quisquam ab ullam deserunt hic porro saepe error soluta
									molestias quaerat dolorem illo.
								</p>
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
									architecto aperiam animi iste quidem quam provident, a unde.
								</p>
								<Link to="/login">
									<button
										type="submit"
										className={styles.signInButton}
										data-panel=".panel-signin"
									>
										Sign In
									</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
}

export default Signup;
