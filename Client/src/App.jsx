import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Landing from "./pages/Landing/Landing";
import Signup from "./pages/Signup/Signup";
import Answer from "./pages/Answer/Answer";
import Question from "./pages/Question/Question";
import { useEffect, useState, createContext } from "react";
import axios from "./Axios/axiosConfig";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Spinner from "react-bootstrap/Spinner";

export const AppState = createContext();

function App() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const token = localStorage.getItem("token");
	const navigate = useNavigate();

	async function checkUser() {
		if (!token) {
			setLoading(false);
			console.log("No token found, navigating to login");
			navigate("/login");
			return;
		}

		try {
			const { data } = await axios.get("/users/check", {
				headers: {
					Authorization: "Bearer " + token,
				},
			});
			setUser(data);
		} catch (error) {
			alert(
				"Authentication error:",
				error.response?.data?.msg || error.message
			);
			navigate("/login");
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		checkUser();
	}, []);

	if (loading) {
		return (
			<Spinner animation="border" role="status">
				<span className="sr-only">Loading...</span>
			</Spinner>
		);
	}

	return (
		<AppState.Provider value={{ user, setUser }}>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route
					path="/home"
					element={
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/answers"
					element={
						<ProtectedRoute>
							<Answer />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/questions"
					element={
						<ProtectedRoute>
							<Question />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</AppState.Provider>
	);
}

export default App;
