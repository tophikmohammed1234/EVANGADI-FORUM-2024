import React from "react";
import styles from "./AcknowledgmentPage.module.css";
import { FaMedal, FaHeart, FaStar } from "react-icons/fa";
import LayOut from "../Component/LayOut/LayOut";

const AcknowledgmentPage = () => {
	return (
		<LayOut>
			<div className={styles.container}>
				<div className={styles.medal}>
					<FaMedal />
				</div>
				<div className={styles.decorations}>
					<FaHeart className={styles.heart} />
					<FaStar className={styles.star} />
					<FaHeart className={styles.heart} />
					<FaStar className={styles.star} />
					<FaHeart className={styles.heart} />
				</div>
				<div className={styles.messageBox}>
					<p className={`${styles.message} ${styles.animateMessage}`}>
						On behalf of our entire team, we would like to express our heartfelt
						appreciation to the instructors who have demonstrated exceptional
						skill and dedication. Your commitment to providing an outstanding
						educational experience has been truly inspiring. Your ability to
						engage and motivate students, coupled with your unwavering support
						and expertise, sets a remarkable example for us all. You embody the
						qualities of outstanding educators and have become role models for
						our team. We are deeply grateful for the positive impact you have
						had on our learning journey and for the high standards you uphold.
						Thank you for being such exemplary mentors.
					</p>
				</div>
			</div>
		</LayOut>
	);
};

export default AcknowledgmentPage;
