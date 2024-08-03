import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Landing from "./pages/Landing/Landing";
import Signup from "./pages/Signup/Signup";
import Answer from "./pages/Answer/Answer";
import Question from "./pages/Question/Question";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Landing />} /> {/* Default route */}
			<Route path="/home" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/answers" element={<Answer />} />
			<Route path="/questions" element={<Question />} />
		</Routes>
	);
}

export default App;
