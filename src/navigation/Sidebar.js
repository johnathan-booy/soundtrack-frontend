import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUserPlus,
	faEdit,
	faSignOut,
	faSignIn,
	faUserFriends,
	faClipboard,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.scss";
import TeacherContext from "../contexts/TeacherContext";

const Sidebar = ({ isSidebarOpen, toggleSidebar, logout }) => {
	const { currentTeacher } = useContext(TeacherContext);
	const style = isSidebarOpen
		? {
				left: "0",
				boxShadow: "2px 0 5px rgba(0, 0, 0, 0.2)",
		  }
		: {};
	return (
		<nav className="sidebar" style={style}>
			{currentTeacher ? (
				<>
					<ul className="sidebar-top">
						<li>
							<NavLink to="/students" onClick={toggleSidebar}>
								<FontAwesomeIcon icon={faUserFriends} />
								<span>Students</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/lessons" onClick={toggleSidebar}>
								<FontAwesomeIcon icon={faClipboard} />
								<span>Lessons</span>
							</NavLink>
						</li>
					</ul>
					<ul className="sidebar-bottom">
						<li>
							<NavLink to="/update" onClick={toggleSidebar}>
								<FontAwesomeIcon icon={faEdit} />
								<span>Update</span>
							</NavLink>
						</li>
						<li>
							<Link to="/" onClick={logout}>
								<FontAwesomeIcon icon={faSignOut} />
								<span>Logout</span>
							</Link>
						</li>
					</ul>
				</>
			) : (
				<ul>
					<li>
						<NavLink to="/login" onClick={toggleSidebar}>
							<FontAwesomeIcon icon={faSignIn} />
							<span>Login</span>
						</NavLink>
					</li>
					<li>
						<NavLink to="/register" onClick={toggleSidebar}>
							<FontAwesomeIcon icon={faUserPlus} />
							<span>Register</span>
						</NavLink>
					</li>
				</ul>
			)}
		</nav>
	);
};

export default Sidebar;
