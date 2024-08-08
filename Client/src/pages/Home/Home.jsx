import classes from "./Home.module.css";
import SingleQuestion from "./SingleQuesion.jsx";
import { useEffect, useState, useContext } from "react";
import axios from "../../Axios/axiosConfig.js";
import { AppState } from "../../App.jsx";
import { PiUserSoundLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import LayOut from "../../Component/LayOut/LayOut.jsx";

function Home() {
	const [searchInput, setSearchInput] = useState("");
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const { user } = useContext(AppState);
	const { username } = user;

	useEffect(() => {
		// Async function to fetch data and user information

		const fetchData = async () => {
			try {
				// Get token from localStorage

				const token = localStorage.getItem("token");
				if (!token) throw new Error("No token found");

				// Configuration for authorization header

				const config = {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				};

				// Fetch data and user information

				const response = await axios.get("/questions/all", config);
				if (response.data) {
					setData(response.data.questions);
				} else {
					throw new Error("Failed to fetch data");
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, []);

	const handleSearchChange = (event) => {
		setSearchInput(event.target.value);
	};

	// Filter and sort questions based on search input and title
	const filteredData = data.filter((data) =>
		data.title.toLowerCase().includes(searchInput.toLowerCase())
	);

	// filteredData.sort((a, b) => a.title.localeCompare(b.title));

	return (
		<LayOut>
			<section className={classes.outer__wrapper}>
				<div className={classes.inner__wrapper}>
					<div className={classes.upper}>
						<button onClick={() => navigate("/questions/")}>
							Ask Question
						</button>
						<h3>
							Welcome: <PiUserSoundLight />
							<span className={classes.username}>{username}</span>
						</h3>
					</div>
					<div className={classes.search}>
						<input
							{...(filteredData === 0
								? { className: classes.search__input }
								: { className: classes.search__input__active })}
							type="search"
							placeholder="Search question"
							onChange={handleSearchChange}
						/>
					</div>
					{filteredData.map((question, i) => (
						<>
							<SingleQuestion key={i} question={question} />
						</>
					))}
					{filteredData == 0 && (
						<p className={classes.no__question}>No questions found</p>
					)}
				</div>
			</section>
		</LayOut>
	);
}

export default Home;
