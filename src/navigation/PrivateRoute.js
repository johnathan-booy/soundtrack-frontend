import React, { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import TeacherContext from "../contexts/TeacherContext";

function PrivateRoute({ exact, path, children }) {
	const { currentTeacher } = useContext(TeacherContext);

	if (!currentTeacher) {
		return <Redirect to="/login" />;
	}
	return (
		<Route exact={exact} path={path}>
			{children}
		</Route>
	);
}

export default PrivateRoute;
