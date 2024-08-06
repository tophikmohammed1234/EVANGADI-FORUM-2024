import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<div className={`${styles.footerBottomContent} clearfix`}>
					<div className={`${styles.col} ${styles.Logosocial}`}>
						<div className={styles.logoFooter}>
							<Link to="/">
								<img
									src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-footer.png"
									alt="Evangadi Logo"
								/>
							</Link>
						</div>
						<div className={styles.footerSocialList}>
							<a
								href="https://facebook.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								<FacebookRoundedIcon />
							</a>
							<a
								href="https://instagram.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								<InstagramIcon />
							</a>
							<a
								href="https://youtube.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								<YouTubeIcon />
							</a>
						</div>
					</div>
					<div className={`${styles.col} ${styles.listmenu}`}>
						<h5>Useful Links</h5>
						<ul>
							<li>
								<Link to="/legal/terms/">Terms of Service</Link>
							</li>
							<li>
								<Link to="/legal/privacy/">Privacy Policy</Link>
							</li>
							<li>
								<Link to="/acknowledgment">Acknowledgment</Link>
							</li>
						</ul>
					</div>
					<div className={`${styles.col} ${styles.contactlist}`}>
						<h5>Contact Info</h5>
						<ul>
							<li>support@evangadi.com</li>
							<li>+1-202-386-2702</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
