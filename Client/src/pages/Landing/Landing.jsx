import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./Landing.module.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { TypeAnimation } from "react-type-animation";
import backGroundPic from "../../assets/images/blackLogo.png";
import img1 from "../../assets/for-landing-page/test.jpg";
import img2 from "../../assets/for-landing-page/10002.jpg";
import img3 from "../../assets/for-landing-page/10003.jpg";
import img4 from "../../assets/for_card/10001.png";
import img5 from "../../assets/for_card/100011.jpg";
import img6 from "../../assets/for_card/10002.jpeg";
import img7 from "../../assets/for-landing-page/office.jpg";
import { AppState } from "../../App";
import YoutubeVideos from "../YouTube/YoutubeVideos";
import Footer from "../../Component/Footer/Footer";

function LandingPage() {
	const [navOpen, setNavOpen] = useState(false);
	const { user, setUser } = useContext(AppState);
	const navigate = useNavigate();

	function handleAuthAction() {
		if (user) {
			localStorage.removeItem("token");
			setUser(null);
			navigate("/");
		} else {
			navigate("/login");
		}
	}

	function AskQuestionPage() {
		navigate("/questions");
	}
	function VisitUs() {
		navigate("/home");
	}

	return (
		<>
			<div className={classes.background}>
				<div className={`${classes.navList} ${navOpen ? classes.show : ""}`}>
					<Link to="/" className={classes.logo}>
						<img src={backGroundPic} alt="Logo" />
					</Link>
					<div
						className={classes.navToggle}
						onClick={() => setNavOpen(!navOpen)}
					>
						☰
					</div>
					<Link to="/home">Home</Link>
					<Link to="#">Academy</Link>
					<Link to="#">Scholarship</Link>
					<Link to="#">Immersive</Link>
					<Link to="#">Placement</Link>
					<Link to="#">Contact</Link>
					<button onClick={handleAuthAction} className={classes.mybutton}>
						{user ? "Logout" : "Sign In"}
					</button>
				</div>
				<div className={classes.animationContainer}>
					<TypeAnimation
						sequence={[
							"Here you can Ask questions about fullstack development.",
							1000,
							"Share your expertise with fellow developers.",
							1000,
							"Get answers from experienced fullstack developers",
							1000,
							"Explore the latest trends in web development",
							1000,
							"Find solutions to your coding challenges.",
							1000,
							"Build your network with other developers",
							1000,
							"Ask, answer, and connect with fullstack enthusiasts",
							1000,
						]}
						wrapper="span"
						speed={50}
						style={{ fontSize: "2em" }}
						repeat={Infinity}
					/>
				</div>
			</div>
			<div className={classes.imagesContainer}>
				{[
					{
						img: img1,
						title: "Acquire The Skills",
						text: "Grasp the workings of digital systems, master the efficient use of technology, and practice the basic principles.",
					},
					{
						img: img2,
						title: "Innovate Efficiently",
						text: "Utilizing modern technologies to build efficient, scalable solutions.",
					},
					{
						img: img7,
						title: "Ask Anything From Anywhere",
						text: "Empowering developers with full stack expertise and Your gateway to mastering full stack development",
					},
					{
						img: img3,
						title: "Compete Globally",
						text: "Once you get to the point where you can produce quality product for cheaper and faster, the sky is the limit.",
					},
				].map((item, index) => (
					<div className={classes.imageCard} key={index}>
						<img
							src={item.img}
							alt={`Web Development ${index + 1}`}
							className={classes.image}
						/>
						<h4>{item.title}</h4>
						<p>{item.text}</p>
					</div>
				))}
			</div>
			<div className={classes.middle_text}>
				<h3>
					Asking questions and providing answers not only helps others but also
					sharpens your own skills. Let's grow together in this full-stack
					adventure!
				</h3>
				<Card className="text-center">
					<Card.Header>Greetings</Card.Header>
					<Card.Body>
						<Card.Title>Thank you for visiting this site.</Card.Title>
						<Card.Text>
							“The important thing is not to stop questioning. <br /> Curiosity
							has its own reason for existence.” – Albert Einstein
						</Card.Text>
						<Button onClick={AskQuestionPage} variant="primary">
							Ask Your Question
						</Button>
					</Card.Body>
					<Card.Footer className="text-muted">Evangadi Family</Card.Footer>
				</Card>
			</div>
			<div className={classes.bottomCard}>
				<Card className={classes.card}>
					<Card.Img variant="top" src={img4} />
					<Card.Body>
						<Card.Title>Don't Worry</Card.Title>
						<Card.Text>
							Stuck on a complex coding problem? Post your question and let our
							community help you find the solution!
						</Card.Text>
						<Button onClick={AskQuestionPage} variant="outline-primary">
							{user ? "Post" : "login"}
						</Button>
					</Card.Body>
				</Card>

				<Card className={classes.card}>
					<Card.Img variant="top" src={img5} />
					<Card.Body>
						<Card.Title>Ask Here</Card.Title>
						<Card.Text>
							Have a burning question about full-stack development? Share it
							here and tap into the collective wisdom of our community!
						</Card.Text>
						<Button onClick={AskQuestionPage} variant="outline-primary">
							{user ? "Ask Here" : "login"}
						</Button>
					</Card.Body>
				</Card>

				<Card className={classes.card}>
					<Card.Img variant="top" src={img6} />
					<Card.Body>
						<Card.Title>Give us your Answer</Card.Title>
						<Card.Text>
							By helping others, you not only reinforce your own understanding
							but also build a stronger, more supportive community.
						</Card.Text>
						<Button onClick={VisitUs} variant="outline-primary">
							{user ? "Visit Us" : "login"}
						</Button>
					</Card.Body>
				</Card>
			</div>

			<div>
				<YoutubeVideos />
			</div>
			<Footer />
		</>
	);
}

export default LandingPage;
