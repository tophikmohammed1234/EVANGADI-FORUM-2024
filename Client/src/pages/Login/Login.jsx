import { useRef, useState, useCallback, useContext } from "react";
import axios from "../../Axios/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import { AppState } from "../../App";
import styles from "./Login.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import LayOut from "../../Component/LayOut/LayOut";

function Login() {
	const [formErrors, setFormErrors] = useState({});
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const navigate = useNavigate();
	const { setUser } = useContext(AppState);
	const emailDom = useRef();
	const passwordDom = useRef();

	const validateForm = () => {
		const errors = {};
		const emailValue = emailDom.current.value;
		const passwordValue = passwordDom.current.value;
		if (!emailValue) {
			errors.email = "Email is required";
		}
		if (!passwordValue) {
			errors.password = "Password is required";
		}
		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault();
			if (!validateForm()) {
				// alert("Please fill all the fields correctly");
				return;
			}
			const emailValue = emailDom.current.value;
			const passwordValue = passwordDom.current.value;
			try {
				const { data } = await axios.post("/users/login", {
					email: emailValue,
					password: passwordValue,
				});

				localStorage.setItem("token", data.token);

				setUser({ username: data.username, userid: data.userid });
				navigate("/home");
			} catch (error) {
				// alert(error?.response?.data?.msg || "Login failed");
			}
		},
		[navigate, setUser, rememberMe]
	);

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	const handleRememberMeChange = (e) => {
		setRememberMe(e.target.checked);
	};

	return (
		<LayOut>
			<section className={styles.allSection}>
				<div className={styles.entirePageHolder}>
					<div className={styles.entirePagePad}>
						<div className={styles.signinPageContainer}>
							<div className={styles.signinHeading}>
								<h3 className={styles.signinTitle}>Login to your account</h3>
								<p>
									Don't have an account?{" "}
									<Link className={styles.textLinks} to="/signup">
										Create a new account
									</Link>
								</p>
							</div>
							<form
								name="signinForm"
								className={styles.signinForm}
								onSubmit={handleSubmit}
							>
								<input
									ref={emailDom}
									type="email"
									className={`${styles.formInput} ${
										formErrors.email ? styles.error : ""
									}`}
									name="email"
									placeholder="Your Email"
									aria-invalid={formErrors.email ? "true" : "false"}
								/>
								{formErrors.email && (
									<span className={styles.errorMessage}>
										{formErrors.email}
									</span>
								)}
								<div className={styles.pwdMask}>
									<input
										ref={passwordDom}
										type={showPassword ? "text" : "password"}
										className={`${styles.formInput} ${
											formErrors.password ? styles.error : ""
										}`}
										name="password"
										placeholder="Your Password"
										aria-invalid={formErrors.password ? "true" : "false"}
									/>
									<span
										className={`fa ${
											showPassword ? "fa-eye" : "fa-eye-slash"
										} ${styles.fa}`}
										onClick={togglePasswordVisibility}
									></span>
									{formErrors.password && (
										<span className={styles.errorMessage}>
											{formErrors.password}
										</span>
									)}
								</div>
								<div className={styles.rememberMeContainer}>
									<input
										type="checkbox"
										id="rememberMe"
										checked={rememberMe}
										onChange={handleRememberMeChange}
									/>
									<label htmlFor="rememberMe">Remember Me</label>
								</div>
								<div className={styles.centered}>
									<button className={styles.signinBtn} type="submit">
										Sign In
									</button>
								</div>
								<div className={styles.forgotPassword}>
									<Link className={styles.textLinks} to="/forgot-password">
										Forgot your password?
									</Link>
								</div>
							</form>
						</div>
						<div className={styles.description}>
							<div className={styles.descriptionTitle}>
								<Link className={styles.About} to="#">
									About
								</Link>
								<h2>Evangadi Networks!</h2>
							</div>
							<div className={styles.descriptionText}>
								<p>
									No matter what stage of life you are in, whether you’re just
									starting elementary school or being promoted to CEO of a
									Fortune 500 company, you have much to offer to those who are
									trying to follow in your footsteps.
								</p>
								<p>
									Whether you are willing to share your knowledge or you are
									just looking to meet mentors of your own, please start by
									joining the network here.
								</p>
								<button
									type="submit"
									className={styles.signInButton}
									data-panel=".panel-signin"
									onClick={handleSubmit}
								>
									How IT Works
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</LayOut>
	);
}

export default Login;
