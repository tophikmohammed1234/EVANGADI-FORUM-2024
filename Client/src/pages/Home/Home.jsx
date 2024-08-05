import React from "react";
import classes from "./Home.module.css";
import { useContext } from "react";
import { AppState } from "../../App";
import { Link } from "react-router-dom";
function Home() {
	const { user } = useContext(AppState);
	return (
		<div>
			<h1>home</h1>
			<br />
			<br />
			<br />
			<br />
			<br />
			<h2>welcome : {user.username}</h2>
			<Link to={"/"} className={classes.protect}>
				go back to landing
			</Link>
		</div>
	);
}

export default Home;
