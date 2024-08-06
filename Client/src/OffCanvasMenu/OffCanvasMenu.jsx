import React, { useState } from "react";
import styles from "./OCMenu.module.css";
import { Link } from "react-router-dom";
import { RxExit } from "react-icons/rx";

const OffCanvasMenu = ({ show, onClose }) => {
	const [selectedItem, setSelectedItem] = useState("");

	const handleClick = (item) => {
		setSelectedItem(item);
		onClose(); // Close the menu after selecting an item
	};

	return (
		<div className={`${styles.offcanvasMenu} ${show ? styles.active : ""}`}>
			<div className={styles.canvasClose}>
				<button onClick={onClose}>
					<RxExit />
				</button>
			</div>
			<ul className={styles.offcanvasMainMenu}>
				<li className={selectedItem === "home" ? styles.selected : ""}>
					<Link to="/" onClick={() => handleClick("home")}>
						Home
					</Link>
				</li>
				<li className={selectedItem === "about" ? styles.selected : ""}>
					<Link to="/about" onClick={() => handleClick("about")}>
						About
					</Link>
				</li>
				<li className={selectedItem === "signup" ? styles.selected : ""}>
					<Link to="/signup" onClick={() => handleClick("signup")}>
						Signup
					</Link>
				</li>
				<li className={selectedItem === "signin" ? styles.selected : ""}>
					<Link to="/signin" onClick={() => handleClick("signin")}>
						Sign In
					</Link>
				</li>
				<li className={selectedItem === "services" ? styles.selected : ""}>
					<Link to="/services" onClick={() => handleClick("services")}>
						Services
					</Link>
				</li>
				<li className={selectedItem === "contact" ? styles.selected : ""}>
					<Link to="/contact" onClick={() => handleClick("contact")}>
						Contact
					</Link>
				</li>
				<li
					className={selectedItem === "acknowledgment" ? styles.selected : ""}
				>
					<Link
						to="/AcknowledgmentPage"
						onClick={() => handleClick("acknowledgment")}
					>
						Acknowledgment
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
