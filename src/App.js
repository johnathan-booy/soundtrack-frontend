import React, { useEffect, useState } from "react";
import TeacherContext from "./contexts/TeacherContext";
import FlashContext from "./contexts/FlashContext";
import useFlashMessages from "./hooks/useFlashMessages";
import { useHistory } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import useWindowSize from "./hooks/useWindowSize";
import FlashMessages from "./flashMessages/FlashMessages";
import Header from "./navigation/Header";
import Routes from "./navigation/Routes";
import Sidebar from "./navigation/Sidebar";
import Api from "./api";
import "./App.scss";

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

	/** Teacher authentication variables */
	const [currentTeacher, setCurrentTeacher] = useState(null);
	const [teacherLoaded, setTeacherLoaded] = useState(false);
	const [storedToken, setStoredToken] = useLocalStorage("authToken");
	const [storedTeacherId, setStoredTeacherId] = useLocalStorage("teacherId");

	/** Load teacher information initially, and if the storedTeacherId or storedToken changes */
	useEffect(() => {
		const loadTeacherInfo = async () => {
			try {
				if (storedToken && storedTeacherId) {
					Api.setToken(storedToken);
					const teacher = await Api.getTeacher(storedTeacherId);
					setCurrentTeacher(teacher);
				} else {
					setCurrentTeacher(null);
				}
				setTeacherLoaded(true);
			} catch (err) {
				updateCredentials();
			}
		};

		loadTeacherInfo();
	}, [storedTeacherId, storedToken]);

	/** Update authentication credentials */
	const updateCredentials = (teacherId = null, token = null) => {
		Api.setToken(token);
		setStoredToken(token);
		setStoredTeacherId(teacherId);
	};

	/** Log in an existing teacher */
	const login = async ({ email, password }) => {
		try {
			const { token, teacherId } = await Api.login({ email, password });
			updateCredentials(teacherId, token);
			addFlashMessage("success", `👋 Welcome back!`);
			history.push("/");
		} catch (err) {
			addFlashMessage("danger", err);
		}
	};

	/** Register a new teaacher */
	const register = async ({ name, email, password, description }) => {
		try {
			const { token, teacherId } = await Api.register({
				name,
				email,
				password,
				description,
			});
			addFlashMessage("success", `👋 Welcome to SoundTrack Academy!`);
			updateCredentials(teacherId, token);
			history.push("/");
		} catch (err) {
			addFlashMessage("danger", err);
		}
	};

	/** Update logged in teacher */
	const updateTeacher = async ({ name, email, description }) => {
		try {
			const teacher = await Api.updateTeacher({
				id: storedTeacherId,
				name,
				email,
				description,
			});
			addFlashMessage("success", `✅ Your profile has been updated!`);
			setCurrentTeacher(teacher);
			history.push("/");
		} catch (err) {
			addFlashMessage("danger", err);
		}
	};

	/** Log out currentTeacher */
	const logout = () => {
		updateCredentials();
		addFlashMessage("success", `👋 See you later!`);
		history.push("/");
	};

	return teacherLoaded ? (
		<div className="app">
			{/* Teacher Context */}
			<TeacherContext.Provider
				value={{ login, register, updateTeacher, currentTeacher }}
			>
				{/* Header */}
				<Header toggleSidebar={toggleSidebar} />

				{/* Sidebar */}
				<Sidebar
					isSidebarOpen={isSidebarOpen}
					toggleSidebar={toggleSidebar}
					logout={logout}
				/>

				{/* Backdrop, covers main-content if sidebar is open and collapsible */}
				{canSidebarCollapse && (
					<div className="backdrop" onClick={toggleSidebar}></div>
				)}

				{/* Flash Context */}
				<FlashContext.Provider value={{ flashMessages, addFlashMessage }}>
					{/* Main Content */}
					<main className={`main-content`}>
						{/* Flash Messages */}
						<FlashMessages />

						{/* Routes */}
						<Routes />
					</main>
				</FlashContext.Provider>
			</TeacherContext.Provider>
		</div>
	) : (
		<p>Loading...</p>
	);
}

export default App;
