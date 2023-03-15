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
import SkillLevelContext from "./contexts/SkillLevelContext";
import useSkillLevels from "./hooks/useSkillLevels";

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

	/** Update authentication credentials */
	const updateCredentials = (teacherId = null, token = null) => {
		setStoredToken(token);
		setStoredTeacherId(teacherId);
		Api.setToken(token);
	};

	/** Load teacher information initially, and if the storedTeacherId or storedToken changes */
	useEffect(() => {
		const loadTeacherInfo = async () => {
			try {
				if (storedToken && storedTeacherId) {
					Api.setToken(storedToken);
					const teacher = await Api.getTeacher(storedTeacherId);
					setCurrentTeacher(teacher);
					history.push("/students");
				} else {
					setCurrentTeacher(null);
					history.push("/login");
				}
				setTeacherLoaded(true);
			} catch (err) {
				updateCredentials();
			}
		};

		loadTeacherInfo();
	}, [storedTeacherId, storedToken]);

	/** Log in an existing teacher */
	const login = async ({ email, password }) => {
		try {
			const { token, teacherId } = await Api.login({ email, password });
			updateCredentials(teacherId, token);
			addFlashMessage("success", `👋 Welcome back!`);
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
		} catch (err) {
			addFlashMessage("danger", err);
		}
	};

	/** Log out currentTeacher */
	const logout = () => {
		setTeacherLoaded(false);
		updateCredentials();
		addFlashMessage("success", `👋 See you later!`);
	};

	/** Add Student */
	const addStudent = async ({ name, email, description, skillLevelId }) => {
		try {
			const student = await Api.addStudent({
				name,
				email,
				description,
				skillLevelId,
				teacherId: currentTeacher.id,
			});
			history.push(`/students/${student.id}`);
		} catch (err) {
			addFlashMessage("danger", err);
		}
	};

	/** Skill Levels */
	const { skillLevels, getSkillLevelById } = useSkillLevels();

	return teacherLoaded ? (
		<div className="app">
			<TeacherContext.Provider
				value={{ login, register, updateTeacher, addStudent, currentTeacher }}
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

				<FlashContext.Provider value={{ flashMessages, addFlashMessage }}>
					{/* Main Content */}
					<main className={`main-content`}>
						{/* Flash Messages */}
						<FlashMessages />

						<SkillLevelContext.Provider
							value={{ getSkillLevelById, skillLevels }}
						>
							{/* Routes */}
							<Routes />
						</SkillLevelContext.Provider>
					</main>
				</FlashContext.Provider>
			</TeacherContext.Provider>
		</div>
	) : (
		<p>Loading...</p>
	);
}

export default App;
