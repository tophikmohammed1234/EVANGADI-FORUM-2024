import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppState } from "../App";

function ProtectedRoute({ children }) {
	const { user } = useContext(AppState);

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	return children;
}

export default ProtectedRoute;
