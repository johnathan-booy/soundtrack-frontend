import React, { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import FlashContext from "../contexts/FlashContext";
import TeacherContext from "../contexts/TeacherContext";

function PrivateRoute({ exact, path, children }) {
	const { addFlashMessage } = useContext(FlashContext);
	const { currentTeacher } = useContext(TeacherContext);

	useEffect(() => {
		if (!currentTeacher) {
			addFlashMessage("danger", "🙏 Please log in first!");
		}
	}, [currentTeacher]);

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
