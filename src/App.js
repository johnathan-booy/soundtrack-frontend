import React, { useEffect, useState } from "react";
import useWindowSize from "./hooks/useWindowSize";
import Header from "./navigation/Header";
import Routes from "./navigation/Routes";
import Sidebar from "./navigation/Sidebar";
import "./App.scss";
import useLocalStorage from "./hooks/useLocalStorage";
import Api from "./api";
import { useHistory } from "react-router-dom";
import TeacherContext from "./contexts/TeacherContext";
import useFlashMessages from "./hooks/useFlashMessages";
import FlashMessages from "./flashMessages/FlashMessages";

function App() {
	/** useFlashMessages to display user warnings */
	const [flashMessages, addFlashMessage] = useFlashMessages(4000);

	/** History object, to dynamically redirect the user */
	const history = useHistory();

	/** Sidebar	- open on larger window sizes, collapsible otherwise */
	const { width } = useWindowSize();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	useEffect(() => {
		if (width >= 960 && !isSidebarOpen) {
			setIsSidebarOpen(true);
		}
	}, [width, isSidebarOpen]);

	const canSidebarCollapse = isSidebarOpen && width < 960;

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	/** Teacher authentication */
	const [currentTeacher, setCurrentTeacher] = useState(null);
	const [teacherLoaded, setTeacherLoaded] = useState(false);
	const [storedToken, setStoredToken] = useLocalStorage("authToken");
	const [storedTeacherId, setStoredTeacherId] = useLocalStorage("teacherId");

	/** Load teacher information initially, and if the storedTeacherId or storedToken changes */
	useEffect(() => {
		const loadTeacherInfo = async () => {
			if (storedToken && storedTeacherId) {
				Api.setToken(storedToken);
				const teacher = await Api.getTeacher(storedTeacherId);
				addFlashMessage("success", `👋 Welcome back ${teacher.name}!`);
				setCurrentTeacher(teacher);
			} else {
				setCurrentTeacher(null);
			}
			setTeacherLoaded(true);
		};

		loadTeacherInfo();
	}, [storedTeacherId, storedToken]);

	const updateCredentials = (teacherId = null, token = null) => {
		Api.setToken(token);
		setStoredToken(token);
		setStoredTeacherId(teacherId);
	};

	const login = async (email, password) => {
		try {
			const { token, teacherId } = await Api.login(email, password);
			updateCredentials(teacherId, token);
			history.push("/");
		} catch (err) {
			addFlashMessage("danger", err);
		}
	};
	const logout = () => {
		updateCredentials();
		addFlashMessage("success", `👋 See you later!`);
		history.push("/");
	};

	return (
		<div className="app">
			<TeacherContext.Provider value={{ login, currentTeacher }}>
				<Header toggleSidebar={toggleSidebar} />
				<Sidebar
					isSidebarOpen={isSidebarOpen}
					toggleSidebar={toggleSidebar}
					logout={logout}
				/>
				{canSidebarCollapse && (
					<div className="backdrop" onClick={toggleSidebar}></div>
				)}
				<main className={`main-content`}>
					<FlashMessages flashMessages={flashMessages} />
					<Routes />
				</main>
			</TeacherContext.Provider>
		</div>
	);
}

export default App;
