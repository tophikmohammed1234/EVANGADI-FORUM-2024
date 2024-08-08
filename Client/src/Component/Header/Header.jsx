import React, { useState, useEffect } from "react";
import { MdMenu as DensityMediumIcon } from "react-icons/md";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import OffCanvasMenu from "../../OffCanvasMenu/OffCanvasMenu";

const Header = () => {
	const [menuVisible, setMenuVisible] = useState(false);

	const toggleMenu = () => {
		setMenuVisible(!menuVisible);
	};

	const handleOutsideClick = (e) => {
		if (
			menuVisible &&
			!e.target.closest(`.${styles.offcanvasMenu}`) &&
			!e.target.closest(`.${styles.canvasOpen}`)
		) {
			setMenuVisible(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleOutsideClick);
		return () => document.removeEventListener("mousedown", handleOutsideClick);
	}, [menuVisible]);

	return (
		<>
			<header className={styles.header}>
				<div className={styles.logo}>
					<Link to="/">
						<img
							src="https://www.evangadi.com/themes/humans/assets/hammerlook/img/misc/evangadi-logo-black.png"
							alt="Logo"
						/>
					</Link>
				</div>
				<div className={styles.canvasOpen}>
					<button onClick={toggleMenu}>
						<DensityMediumIcon className={styles.densityIcon} />
					</button>
				</div>
			</header>
			<OffCanvasMenu show={menuVisible} onClose={toggleMenu} />
		</>
	);
};

export default Header;
