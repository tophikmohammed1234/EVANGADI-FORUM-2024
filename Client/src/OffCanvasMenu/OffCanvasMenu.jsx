import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxExit } from "react-icons/rx";
import { AppState } from "../App";
import styles from "./OCMenu.module.css";

const OffCanvasMenu = ({ show, onClose }) => {
	const { user, setUser } = useContext(AppState);
	const [selectedItem, setSelectedItem] = useState("");
	const navigate = useNavigate();

	const handleClick = (item, path) => {
		setSelectedItem(item);
		onClose();
		navigate(path);
	};

	const handleAuthAction = () => {
		if (user) {
			localStorage.removeItem("token");
			setUser(null);
			handleClick("logout", "/");
		} else {
			handleClick("signin", "/login");
		}
	};

	return (
		<div className={`${styles.offcanvasMenu} ${show ? styles.active : ""}`}>
			<div className={styles.canvasClose}>
				<button onClick={onClose}>
					<RxExit />
				</button>
			</div>
			<ul className={styles.offcanvasMainMenu}>
				<li className={selectedItem === "landing" ? styles.selected : ""}>
					<Link to="/" onClick={() => handleClick("landing", "/")}>
						Landing Page
					</Link>
				</li>
				<li className={selectedItem === "home" ? styles.selected : ""}>
					<Link to="/home" onClick={() => handleClick("home", "/home")}>
						Home
					</Link>
				</li>
				<li className={selectedItem === "about" ? styles.selected : ""}>
					<Link to="#" onClick={() => handleClick("about", "#")}>
						About
					</Link>
				</li>
				<li className={selectedItem === "services" ? styles.selected : ""}>
					<Link to="#" onClick={() => handleClick("services", "#")}>
						Services
					</Link>
				</li>
				<li className={selectedItem === "contact" ? styles.selected : ""}>
					<Link to="#" onClick={() => handleClick("contact", "#")}>
						Contact
					</Link>
				</li>
				<li
					className={selectedItem === "acknowledgment" ? styles.selected : ""}
				>
					<Link
						to="/acknowledgment"
						onClick={() => handleClick("acknowledgment", "/acknowledgment")}
					>
						Acknowledgment
					</Link>
				</li>
				<li className={selectedItem === "auth" ? styles.selected : ""}>
					<Link to="#" onClick={handleAuthAction}>
						{user ? "Log out" : "Sign In"}
					</Link>
				</li>
			</ul>
			<div className={styles.logo}>
				<img
					src="https://www.evangadi.com/themes/humans/assets/hammerlook/img/misc/evangadi-logo-black.png"
					alt="Logo"
				/>
			</div>
		</div>
	);
};

export default OffCanvasMenu;
