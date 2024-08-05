import { useRef, useState, useCallback, useContext } from "react";
import axios from "../../Axios/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import { AppState } from "../../App";
import styles from "./Login.module.css";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import FontAwesome CSS

function Login() {
	const [formErrors, setFormErrors] = useState({});
	const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
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
				alert("Please fill all the fields correctly");
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
				alert(error?.response?.data?.msg || "Login failed");
			}
		},
		[navigate, setUser]
	);

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	return (
		<section className={styles.allSection}>
			<div className={styles.entirePageHolder}>
				<div className={styles.entirePagePad}>
					<Header />
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
								<span className={styles.errorMessage}>{formErrors.email}</span>
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
								{formErrors.password && (
									<span className={styles.errorMessage}>
										{formErrors.password}
									</span>
								)}
								<span
									className={`${styles.fa} ${
										showPassword ? styles.faEye : styles.faEyeSlash
									}`}
									onClick={togglePasswordVisibility}
								></span>
							</div>
							<div className={styles.centered}>
								<button className={styles.signinBtn} type="submit">
									Submit
								</button>
							</div>
						</form>
						<div className={styles.centered}>
							<Link className={styles.linkssignin} to="/signup">
								Create an account?
							</Link>
						</div>
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
							<button
								type="submit"
								className={styles.signInButton}
								data-panel=".panel-signin"
								onClick={handleSubmit}
							>
								Sign In
							</button>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</section>
	);
}

export default Login;
